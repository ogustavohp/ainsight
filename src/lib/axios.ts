import axios from 'axios'

export const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_BASE_URL || 'https://ainsight.vercel.app/api/',
})
