import { GoogleGenerativeAI } from '@google/generative-ai'

export const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY!,
)
