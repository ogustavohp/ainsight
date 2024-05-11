import { GoogleGenerativeAI } from '@google/generative-ai'
// import { GoogleGenerativeAIStream, StreamingTextResponse } from 'ai'

export async function POST(request: Request) {
  const { prompt } = await request.json()

  if (!process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY) {
    return Response.json({ err: 'Missing Google API Key.' }, { status: 400 })
  }

  const genAI = new GoogleGenerativeAI(
    process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY,
  )

  const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
  const result = await model.generateContent(prompt)
  const response = await result.response
  const text = response.text()

  // const geminiStream = await genAI
  //   .getGenerativeModel({ model: 'gemini-pro' })
  //   .generateContentStream({
  //     contents: [{ role: 'user', parts: [{ text: prompt }] }],
  //   })

  // const res = await model.generateContentStream([prompt])
  // const stream = GoogleGenerativeAIStream(geminiStream)

  return Response.json({ text })
  // return new StreamingTextResponse(stream)
}
