import axios from 'axios'
// import OpenAI from 'openai'

export async function POST(request: Request) {
  const formData = await request.formData()

  formData.append('model', 'whisper-1')
  formData.append('response_format', 'json')
  formData.append('temperature', '0')

  try {
    const { data } = await axios.post(
      'https://api.openai.com/v1/audio/transcriptions',
      formData,
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_KEY}`,
        },
      },
    )

    return Response.json({ data })
  } catch {
    return Response.json({ error: '401' })
  }

  /// /////////////////////////////////////////////////////

  // const openai = new OpenAI({
  //   apiKey: process.env.OPENAI_KEY,
  // })

  // const response = await openai.audio.transcriptions.create({
  //   file,
  //   model: 'whisper-1',
  //   language: 'pt',
  //   response_format: 'json',
  //   temperature: 0,
  // })

  // const transcription = response.text

  // return Response.json({ transcription })

  /// /////////////////////////////////////////////////////
}
