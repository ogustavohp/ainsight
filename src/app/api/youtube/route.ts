import { YoutubeTranscript } from 'youtube-transcript'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const youTubeLink = searchParams.get('youtubelink')

  if (!youTubeLink) {
    return Response.json({ err: 'Missing youtubelink' })
  }

  let transcript = await YoutubeTranscript.fetchTranscript(youTubeLink, {
    lang: 'en',
  }).catch(() => console.log('Transcript em inglês não encontrado.'))

  if (!transcript) {
    console.log('Tentando em português...')
    transcript = await YoutubeTranscript.fetchTranscript(youTubeLink, {
      lang: 'pt',
    }).catch(() => console.log('Transcript em português não encontrado.'))
  }
  if (!transcript) {
    console.log(' Tentando sem especificar idioma...')
    transcript = await YoutubeTranscript.fetchTranscript(youTubeLink).catch(
      (err) => console.log('Erro ao buscar o transcript:' + err),
    )
  }

  let text = ''

  if (transcript) {
    transcript.forEach((item) => {
      text += item.text + ' '
    })
  }

  return Response.json({ text })
}
