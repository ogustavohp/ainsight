'use client'
import { Dispatch, SetStateAction } from 'react'
import { Typography } from './typography'
import { Input } from './ui/input'
import { Label } from './ui/label'

interface ISendYouTube {
  setYouTubeLink: Dispatch<SetStateAction<string>>
}

export function SendYouTube({ setYouTubeLink }: ISendYouTube) {
  return (
    <div className="flex flex-1 flex-col gap-y-4 m-2">
      <Label htmlFor="youTube-video" className="space-y-1">
        <Typography variant="p">YouTube Vídeo Link</Typography>
        <Input
          id="youTube-video"
          type="text"
          placeholder="Cole o Link do vídeo do YouTube aqui."
          onChange={(e) => setYouTubeLink(e.target.value)}
        />
      </Label>
      <div className="text-center">
        <Typography variant="muted">
          O Vídeo do YouTube precisa ter uma legenda.
        </Typography>
      </div>
    </div>
  )
}
