interface IPrompt {
  title: string
  prompt: string
  id: string
}

export const prompts: IPrompt[] = [
  {
    title: 'Resuma o vídeo',
    prompt: 'Resuma o vídeo',
    id: crypto.randomUUID(),
  },
  {
    title: 'Transcreva o vídeo',
    prompt: 'Transcreva o vídeo',
    id: crypto.randomUUID(),
  },
  {
    title: 'Crie títulos p/ o YouTube',
    prompt: 'Gere 10 títulos para postar esse vídeo no YouTube',
    id: crypto.randomUUID(),
  },
  {
    title: 'Crie descrição p/ o YouTube',
    prompt:
      'Gere uma descrição para esse video, ele vai ser colocado no YouTube com as tags de conteúdo',
    id: crypto.randomUUID(),
  },
  {
    title: 'Identificar tópicos relevantes',
    prompt: 'Identifique os tópicos relevantes do vídeo',
    id: crypto.randomUUID(),
  },
  {
    title: 'Traduza e localize o vídeo',
    prompt: 'Traduza e localize o vídeo para pt-br',
    id: crypto.randomUUID(),
  },
  {
    title: 'Sugira videos sobre o tema',
    prompt: 'Sugira dez vídeos sobre o mesmo tema',
    id: crypto.randomUUID(),
  },
  {
    title: 'Faça perguntas sobre o vídeo.',
    prompt: 'lorem',
    id: crypto.randomUUID(),
  },
]
