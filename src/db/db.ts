interface IPrompt {
  title: string
  prompt: string
  id: string
}

export const prompts: IPrompt[] = [
  {
    title: 'Resuma o Vídeo',
    prompt: 'Resuma o conteúdo do vídeo.',
    id: crypto.randomUUID(),
  },
  {
    title: 'Transcreva o Vídeo',
    prompt: 'Transcreva o que é dito no vídeo',
    id: crypto.randomUUID(),
  },
  {
    title: 'Crie Títulos para o YouTube',
    prompt:
      'Gere 10 títulos atrativos para serem usados no YouTube para este vídeo.',
    id: crypto.randomUUID(),
  },
  {
    title: 'Descreva o Vídeo para o YouTube',
    prompt:
      'Elabore uma descrição detalhada para este vídeo, considerando que será postado no YouTube junto com as tags de conteúdo apropriadas.',
    id: crypto.randomUUID(),
  },
  {
    title: 'Identifique os Tópicos Relevantes',
    prompt: 'Identifique e liste os principais tópicos abordados no vídeo.',
    id: crypto.randomUUID(),
  },
  {
    title: 'Traduza e Localize o Vídeo',
    prompt: 'Traduza e adapte o conteúdo do vídeo para o português brasileiro.',
    id: crypto.randomUUID(),
  },
  {
    title: 'Sugira Vídeos sobre o Tema',
    prompt: 'Sugira dez vídeos relacionados ao tema tratado neste vídeo.',
    id: crypto.randomUUID(),
  },
  {
    title: 'Formule Perguntas com Base no Vídeo',
    prompt:
      'Crie uma lista de perguntas que possam ser feitas com base no conteúdo do vídeo.',
    id: crypto.randomUUID(),
  },
  {
    title: 'Identifique Tópicos Sensíveis',
    prompt:
      'Identifique e liste quaisquer tópicos considerados sensíveis ou delicados abordados no vídeo.',
    id: crypto.randomUUID(),
  },
  {
    title: 'Identificação de Fake News',
    prompt: 'Identifique e Liste Possíveis Fake News no Vídeo, se Aplicável.',
    id: crypto.randomUUID(),
  },
  {
    title: 'Analise os Sentimentos Expressos',
    prompt:
      'Analise o conteúdo do vídeo para determinar os sentimentos expressos pelos participantes ou narradores.',
    id: crypto.randomUUID(),
  },
]
