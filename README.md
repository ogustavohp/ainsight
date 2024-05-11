# Readme - Aplicação Next de AI para Perguntas sobre Vídeo

Bem-vindo ao AInsight, a aplicação desenvolvida durante a segunda Imersão de Inteligência Artificial da Alura em parceria com o Google! O AInsight utiliza tecnologias de inteligência artificial para processar vídeos, extrair seu áudio e converter esse áudio em texto para responder perguntas e gerar conteúdo com base no vídeo.

![Interface do AInsight](https://i.ibb.co/1KskNYf/ainsight.png)

## Pré-requisitos

Antes de executar a aplicação, é necessário configurar algumas variáveis de ambiente: .file.env

- `GOOGLE_AI_API_KEY`: Chave de API do Google para consulta do serviço de transcrição de áudio.
- `OPENAI_KEY`: Chave de API do OpenAI para transformação de áudio em texto.
- `NEXT_PUBLIC_BASE_URL`: URL base para configuração do Axios.

## Como Executar

1. **Clone este repositório para sua máquina local:**

```bash
git clone https://github.com/ogustavohp/ainsight
```

2. **Instale as dependências do projeto:**

```bash
npm install
```
3. **Execute o projeto localmente:**

```bash
npm run dev
```
## Imagens da Aplicação

Aqui você pode adicionar imagens da aplicação para ilustrar seu funcionamento.

## Sobre a Aplicação

Esta aplicação permite que você faça upload de um vídeo ou insira um link do YouTube e faça perguntas sobre o conteúdo do vídeo. Utilizando tecnologias de IA, o vídeo é processado, seu áudio é extraído e convertido em texto. Em seguida, as perguntas são respondidas com base no conteúdo do vídeo.

Se tiver alguma dúvida ou problema, sinta-se à vontade para abrir uma issue ou entrar em contato conosco.

Divirta-se utilizando nossa aplicação! 🚀

