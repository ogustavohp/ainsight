import OpenAI from 'openai'

export async function POST() {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
  })

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: 'Say this is a test' }],
    model: 'gpt-3.5-turbo',
  })

  console.log(process.env.OPENAI_KEY)

  return Response.json({ chatCompletion })
}
