'use client'
import { InputFile } from '@/components/input-file'
import { PromptButton } from '@/components/prompt-button'
import { SendYouTube } from '@/components/send-youtube'
import { Typography } from '@/components/typography'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { prompts } from '@/db/db'
import { api } from '@/lib/axios'
import { RefreshCcw, Send } from 'lucide-react'
import { KeyboardEvent, MouseEvent, useEffect, useState } from 'react'

type IVideoType = 'YouTube' | 'upload'

export type typeAiResponse = {
  resumoPrompt: string
  response: string
}[]

export default function Home() {
  const [aiResponse, setAiResponse] = useState<typeAiResponse>([])
  const [videoType, setVideoType] = useState<IVideoType>('YouTube')
  const [youTubeLink, setYouTubeLink] = useState('')
  const [localStorageState, setLocalStorageState] = useState(false)
  const [inputMessage, setInputMessage] = useState('')
  const [askQuestions, setAskQuestions] = useState(false)
  const [localStorageValue, setLocalStorageValue] = useState('')
  const [loadingResponse, setLoadingResponse] = useState(false)

  useEffect(() => {
    const transcriptionStorage = localStorage.getItem('transcription')
    if (transcriptionStorage) {
      setLocalStorageState(true)
      setLocalStorageValue(transcriptionStorage)
    }
  }, [])

  async function handleAskQuestion() {
    setLoadingResponse(true)
    const transcription = localStorage.getItem('transcription')
    const fullPrompt = `
    Com base nessa transcrição de um video: {{{ ${transcription} }}}
    Responda: ${inputMessage}
    `
    const response = await api.post(`/gemini`, { prompt: fullPrompt })

    setAiResponse([
      { resumoPrompt: inputMessage, response: response.data.text },
    ])

    setLoadingResponse(false)
    setInputMessage('')
    return response
  }
  function clearLocalStorage() {
    localStorage.removeItem('transcription')
    setLocalStorageState(false)
  }
  function handleChatKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleAskQuestion()
    }
  }
  function handleChatClick(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) {
    e.preventDefault()
    handleAskQuestion()
  }
  function handleAskQuestionsMouse(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) {
    e.preventDefault()
    setAskQuestions(true)
  }

  return (
    <>
      <div className="flex flex-1">
        <div className=" flex flex-col my-4 mx-2 space-y-4 justify-between items-center">
          <Button variant={'outline'} onClick={() => setAiResponse([])}>
            Clear chat
          </Button>
          <div className="max-w-[159.52px] w-full h-1/2 text-center space-y-2">
            <Typography variant="code">Transcrição salva</Typography>
            <div className="border w-full max-h-[400px] h-full overflow-x-hidden">
              {localStorageValue}
            </div>
            <Typography variant="muted">
              É atualizada quando recarrega a página.
            </Typography>
          </div>
          <Button variant={'destructive'} onClick={clearLocalStorage}>
            Clear LocalStorage
          </Button>
        </div>

        <Separator orientation="vertical" className="h-full" />

        <div className="flex flex-col gap-4 flex-1 mx-6 my-4">
          <div className="flex gap-2 flex-wrap">
            {prompts.map((e) => (
              <PromptButton
                key={e.id}
                prompt={e.prompt}
                title={e.title}
                aiResponse={aiResponse}
                setAiResponse={setAiResponse}
                localStorageState={localStorageState}
              />
            ))}
            <Button
              disabled={!localStorageState}
              onClick={handleAskQuestionsMouse}
            >
              Fazer perguntas sobre o vídeo
            </Button>
          </div>
          <div className="flex-none min-w-full h-[707px] border px-4 sm:px-6 md:px-0 overflow-auto scrollbar:!w-1.5 scrollbar:!h-1.5 scrollbar:bg-transparent scrollbar-track:!bg-slate-100 scrollbar-thumb:!rounded scrollbar-thumb:!bg-slate-300 scrollbar-track:!rounded dark:scrollbar-track:!bg-slate-500/[0.16] dark:scrollbar-thumb:!bg-slate-500/50 lg:supports-scrollbars:pr-2 rounded-md p-2 relative">
            {aiResponse.map((e, i) => (
              <div
                key={e.resumoPrompt + i}
                className="flex flex-col space-y-2 px-2"
              >
                <div className="bg-foreground/10 float-end self-end rounded-s-2xl rounded-b-2xl p-2 mt-2">
                  <Typography>{e.resumoPrompt}</Typography>
                </div>
                <div className="bg-foreground/20 inline-block rounded-e-2xl rounded-b-2xl p-2">
                  <Typography>{e.response}</Typography>
                </div>
              </div>
            ))}
            {askQuestions && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[95%] flex gap-2">
                <Input
                  placeholder="Digite a sua pergunta aqui"
                  onKeyDown={(e) => handleChatKeyDown(e)}
                  onChange={(e) => setInputMessage(e.target.value)}
                  value={inputMessage}
                />
                <Button onClick={(e) => handleChatClick(e)}>
                  <Send size={16} />
                </Button>
              </div>
            )}
            {loadingResponse && (
              <RefreshCcw
                size={46}
                className="absolute bottom-24 left-1/2 transform -translate-x-1/2 animate-pulse"
              />
            )}
          </div>
        </div>

        <Separator orientation="vertical" className="h-full" />

        <div className="w-80">
          <div className="flex justify-around m-4">
            <Button
              variant={videoType === 'YouTube' ? 'secondary' : 'default'}
              disabled={videoType === 'YouTube' && true}
              onClick={() => setVideoType('YouTube')}
            >
              YouTube
            </Button>
            <Button
              variant={videoType === 'YouTube' ? 'default' : 'secondary'}
              disabled={videoType === 'upload' && true}
              onClick={() => setVideoType('upload')}
            >
              Upload
            </Button>
          </div>
          {videoType === 'upload' && (
            <InputFile setLocalStorageState={setLocalStorageState} />
          )}
          {videoType === 'YouTube' && (
            <SendYouTube
              youTubeLink={youTubeLink}
              setYouTubeLink={setYouTubeLink}
              setLocalStorageState={setLocalStorageState}
            />
          )}
        </div>
      </div>
    </>
  )
}
