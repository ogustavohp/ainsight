'use client'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { Typography } from './typography'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { Loader, LoaderCircle, Upload, Wand } from 'lucide-react'
import { api } from '@/lib/axios'

interface ISendYouTube {
  youTubeLink: string
  setYouTubeLink: Dispatch<SetStateAction<string>>
  setLocalStorageState: Dispatch<SetStateAction<boolean>>
}

export function SendYouTube({
  youTubeLink,
  setYouTubeLink,
  setLocalStorageState,
}: ISendYouTube) {
  const [buttonState, setButtonState] = useState<
    | 'Enviar vídeo'
    | 'Gerando Transcrição'
    | 'Salvando Transcrição'
    | 'Concluído'
    | 'URL inválida'
  >('Enviar vídeo')
  const [buttonDisable, setButtonDisable] = useState(false)
  function handleYouTubeInput(e: ChangeEvent<HTMLInputElement>) {
    setYouTubeLink(e.target.value)
    setButtonState('Enviar vídeo')
  }

  async function handleSubmitVideo() {
    setButtonDisable(true)
    setButtonState('Gerando Transcrição')
    const response = await api.get(`/youtube?youtubelink=${youTubeLink}`)
    if (response.data.text) {
      setButtonState('Salvando Transcrição')
      const transcription = response.data.text
      localStorage.setItem('transcription', transcription)
      setLocalStorageState(true)
      setButtonState('Concluído')
    } else {
      setButtonState('URL inválida')
    }
    setButtonDisable(false)
  }

  return (
    <div className="flex flex-1 flex-col gap-y-4 m-2">
      <Label htmlFor="youTube-video" className="space-y-1">
        <Typography variant="p">YouTube Vídeo Link</Typography>
        <Input
          id="youTube-video"
          type="text"
          placeholder="Cole o Link do vídeo do YouTube aqui."
          value={youTubeLink}
          onChange={handleYouTubeInput}
        />
      </Label>
      <div className="text-center flex flex-col gap-2">
        <Typography variant="muted">
          O Vídeo do YouTube precisa ter uma legenda.
        </Typography>
        <Button
          disabled={buttonDisable}
          onClick={handleSubmitVideo}
          className="flex gap-2 justify-center items-center"
        >
          {buttonState}
          {buttonState === 'Enviar vídeo' && <Upload size={16} />}
          {buttonState === 'Gerando Transcrição' && (
            <LoaderCircle className="animate-spin" size={16} />
          )}
          {buttonState === 'Salvando Transcrição' && (
            <Loader className="animate-spin" size={16} />
          )}
          {buttonState === 'Concluído' && <Wand size={16} />}
        </Button>
      </div>
    </div>
  )
}
