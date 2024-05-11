'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Ban,
  FileIcon,
  Loader,
  LoaderCircle,
  MousePointerBan,
  Save,
  Send,
  Wand,
} from 'lucide-react'
import {
  useState,
  ChangeEvent,
  useMemo,
  FormEvent,
  MouseEvent,
  SetStateAction,
  Dispatch,
} from 'react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { loadFFmpeg } from '@/lib/ffmpeg'
import { fetchFile } from '@ffmpeg/util'
import { api } from '@/lib/axios'
import { Textarea } from './ui/textarea'
import { Typography } from './typography'

type Status =
  | 'Selecione um vídeo'
  | 'Enviar Vídeo'
  | 'Convertendo para Áudio'
  | 'Gerando a transcrição'
  | 'Salvando a transcrição'
  | 'Concluído!'
  | 'Chave de API inválida'

interface IInputFile {
  setLocalStorageState: Dispatch<SetStateAction<boolean>>
}

export function InputFile({ setLocalStorageState }: IInputFile) {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [status, setStatus] = useState<Status>('Selecione um vídeo')
  const [transcriptionInput, setTranscriptionInput] = useState('')
  const [disableInput, setDisableInput] = useState(false)

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const { files } = e.currentTarget

    if (!files) {
      setStatus('Selecione um vídeo')
      return
    }

    setStatus('Enviar Vídeo')
    setVideoFile(files[0])
  }

  const previewURL = useMemo(() => {
    if (!videoFile) {
      return null
    }
    return URL.createObjectURL(videoFile)
  }, [videoFile])

  async function convertVideoToAudio(video: File) {
    const ffmpeg = await loadFFmpeg()

    await ffmpeg.writeFile('input.mp4', await fetchFile(video))

    // LOG FFmpeg
    // ffmpeg.on('log', (log) => {
    //   console.log(log)
    // })

    ffmpeg.on('progress', (progress) => {
      console.log(`convert progress: ${Math.round(progress.progress * 100)}`)
    })

    await ffmpeg.exec([
      '-i',
      'input.mp4',
      '-map',
      '0:a',
      '-b:a',
      '28k',
      '-acodec',
      'libmp3lame',
      'output.mp3',
    ])

    const data = await ffmpeg.readFile('output.mp3')

    const audioFileBlob = new Blob([data], { type: 'audio/mpeg' })
    const audioFile = new File([audioFileBlob], 'audio.mp3', {
      type: 'audio/mpeg',
    })

    return audioFile
  }

  async function handleStartConversionVideoToAudio(
    e: FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault()

    if (!videoFile) {
      return
    }

    setStatus('Convertendo para Áudio')
    const audioFile = await convertVideoToAudio(videoFile)

    const data = new FormData()

    data.append('file', audioFile)

    setStatus('Gerando a transcrição')
    const response = await api.post('/openai/transcription', data)

    const res = await JSON.stringify(response)

    if (response.data.error === '401') {
      setStatus('Chave de API inválida')
      return
    }

    if (!res) {
      return console.error('erro ao pegar o resultado da transcrição')
    }

    setStatus('Salvando a transcrição')
    localStorage.setItem('transcription', res)
    setLocalStorageState(true)

    setStatus('Concluído!')
  }

  function sendTranscription(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) {
    e.preventDefault()
    setDisableInput(true)

    localStorage.setItem('transcription', transcriptionInput)
    setLocalStorageState(true)

    setTranscriptionInput('')

    setTimeout(() => {
      setDisableInput(false)
    }, 3000)
  }

  return (
    <form
      onSubmit={handleStartConversionVideoToAudio}
      className="flex flex-1 flex-col gap-y-4 m-2"
    >
      <Label
        htmlFor="video"
        className="flex aspect-video cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed text-sm text-muted-foreground hover:bg-primary/10"
      >
        {previewURL ? (
          <video
            src={previewURL}
            controls={false}
            className="pointer-events-none aspect-video"
          />
        ) : (
          <>
            <FileIcon />
            Selecione um video
          </>
        )}
      </Label>
      <Input
        type="file"
        name="video"
        id="video"
        accept="video/mp4"
        className="sr-only inset-0"
        onChange={handleFile}
      />

      <Typography variant="muted">
        O Video enviado vai ser convertido em audio usando o FFmpeg e depois
        será feita a transcrição dele para responder as questões.
      </Typography>

      <Button
        disabled={
          status === 'Selecione um vídeo' ||
          status === 'Concluído!' ||
          status === 'Chave de API inválida'
        }
        type="submit"
        className="select-none flex gap-2 justify-center items-center"
      >
        {status}
        {status === 'Selecione um vídeo' && <MousePointerBan size={16} />}
        {status === 'Enviar Vídeo' && <Send size={16} />}
        {status === 'Convertendo para Áudio' && (
          <LoaderCircle className="animate-spin" size={16} />
        )}
        {status === 'Gerando a transcrição' && (
          <Loader className="animate-spin" size={16} />
        )}
        {status === 'Salvando a transcrição' && <Save size={16} />}
        {status === 'Concluído!' && <Wand size={16} />}
        {status === 'Chave de API inválida' && <Ban size={16} />}
      </Button>

      <Typography variant="muted">
        Quando a api key atingir o gasto de 5$ o método de transcrição vai ser
        bloqueado. Envie a transcrição do video no prompt abaixo se isso
        acontecer.
      </Typography>

      <Separator />

      <div className="grid w-full gap-2">
        <Typography variant="small">
          Se preferir envie o texto do vídeo aqui.
        </Typography>
        <Textarea
          placeholder="Digite o script do vídeo aqui."
          className="h-52 resize-none"
          onChange={(e) => setTranscriptionInput(e.target.value)}
          value={transcriptionInput}
        />
        <Button
          disabled={disableInput || !transcriptionInput}
          onClick={(e) => sendTranscription(e)}
          className="flex justify-center items-center gap-2"
        >
          Enviar script
          <Send size={16} />
        </Button>
      </div>
    </form>
  )
}
