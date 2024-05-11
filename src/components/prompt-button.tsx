'use client'
import { Button } from './ui/button'
import { Dispatch, MouseEvent, SetStateAction, useState } from 'react'
import { api } from '@/lib/axios'
import { typeAiResponse } from '@/app/page'

interface IPromptButton {
  title: string
  prompt: string
  aiResponse: typeAiResponse
  setAiResponse: Dispatch<SetStateAction<typeAiResponse>>
  localStorageState: boolean
}

export function PromptButton({
  title,
  prompt,
  aiResponse,
  setAiResponse,
  localStorageState,
}: IPromptButton) {
  const [disable, setDisable] = useState(false)

  async function handleConnectToGeminiAPI(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) {
    e.preventDefault()
    setDisable(true)

    const transcription = localStorage.getItem('transcription')

    if (!transcription) {
      setAiResponse([
        ...aiResponse,
        {
          resumoPrompt: title,
          response:
            'Envie um vídeo do YouTube ou faça o upload de um vídeo primeiro.',
        },
      ])
      return
    }

    const fullPrompt = `
    Essa é a transcrição de um video: {{{ ${transcription} }}} 
    Responda: ${prompt}
    `

    const response = await api.post(`/gemini`, { prompt: fullPrompt })

    setAiResponse([
      ...aiResponse,
      { resumoPrompt: title, response: response.data.text },
    ])

    setDisable(false)
  }

  return (
    <Button
      disabled={disable || !localStorageState}
      onClick={(e) => handleConnectToGeminiAPI(e)}
    >
      {title}
    </Button>
  )
}
