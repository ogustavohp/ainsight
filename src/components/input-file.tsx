'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FileIcon } from 'lucide-react'
import { useState, ChangeEvent, useMemo, FormEvent } from 'react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { loadFFmpeg } from '@/lib/ffmpeg'
import { fetchFile } from '@ffmpeg/util'

type Status =
  | 'Selecione um vídeo'
  | 'Enviar Vídeo'
  | 'Convertendo para Áudio'
  | 'Gerando a transcrição'
  | 'Salvando a transcrição'
  | 'Concluído!'

export function InputFile() {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [status, setStatus] = useState<Status>('Selecione um vídeo')

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
    console.log('começou a converter!')

    const ffmpeg = await loadFFmpeg()

    await ffmpeg.writeFile('input.mp4', await fetchFile(video))

    ffmpeg.on('log', (log) => {
      console.log(log)
    })

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

    console.log('Terminou de converter em audio.')

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

    console.log(data)

    setStatus('Gerando a transcrição')
    console.log(audioFile)

    setStatus('Salvando a transcrição')
    // Salvar a transcrição no localStorage

    setStatus('Concluído!')
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

      <Button
        disabled={status === 'Selecione um vídeo' || status === 'Concluído!'}
        type="submit"
        className="select-none"
      >
        {status}
      </Button>

      <Separator />
    </form>
  )
}
