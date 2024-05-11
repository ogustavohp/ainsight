'use client'
import { Button } from './ui/button'
import { Dispatch, MouseEvent, SetStateAction, useState } from 'react'
import { api } from '@/lib/axios'
import { typeAiResponse } from '@/app/page'

interface IPromptButton {
  title: string
  prompt: string
  videoType: 'YouTube' | 'upload'
  youTubeLink?: string
  aiResponse: typeAiResponse
  setAiResponse: Dispatch<SetStateAction<typeAiResponse>>
  localStorageState: boolean
}

export function PromptButton({
  title,
  prompt,
  videoType,
  youTubeLink,
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

    let fullPrompt: string = ''

    if (videoType === 'YouTube' && youTubeLink) {
      fullPrompt = `
      Esse é um link do YouTube: {{{ ${youTubeLink} }}}
      Responda: ${prompt}
      `
    }

    if (videoType === 'upload') {
      const transcription = localStorage.getItem('transcription')
      fullPrompt = `
      Essa é a transcrição de um video: {{{ ${transcription} }}} 
      Responda: ${prompt}
      `
    }

    const response = await api.post(`/gemini`, { prompt: fullPrompt })

    console.log(response)

    console.log(fullPrompt)

    setAiResponse([
      ...aiResponse,
      { resumoPrompt: prompt, response: response.data.text },
    ])

    setDisable(false)
  }

  return (
    <Button
      disabled={
        disable ||
        (videoType === 'YouTube' && !youTubeLink) ||
        !localStorageState
      }
      onClick={(e) => handleConnectToGeminiAPI(e)}
    >
      {title}
    </Button>
  )
}
