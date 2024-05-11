import { GoogleGenerativeAI } from '@google/generative-ai'
// import { GoogleGenerativeAIStream, StreamingTextResponse } from 'ai'

export async function POST(request: Request) {
  const { prompt, aiHistory } = await request.json()

  const history = []

  if (aiHistory) {
    history.push(aiHistory)
  }

  console.log(history)

  if (!process.env.GOOGLE_AI_API_KEY) {
    return Response.json({ err: 'Missing Google API Key.' }, { status: 400 })
  }

  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY)

  const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
  const chat = await model.startChat({
    history,
  })

  const result = await chat.sendMessage(prompt)

  return Response.json({ result })
}
