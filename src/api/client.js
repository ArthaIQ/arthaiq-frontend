import axios from 'axios'
import { useStore } from '../store/useStore'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  timeout: 8000,
})

api.interceptors.request.use((config) => {
  const token = useStore.getState().token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const auth = {
  login: (username, password) => api.post('/api/auth/login', { username, password }),
}

export const msme = {
  getDemo: () => api.get('/api/msme/demo'),
  getAll: () => api.get('/api/msme'),
  getById: (id) => api.get(`/api/msme/${id}`),
  create: (payload) => api.post('/api/msme', payload),
}

export const scoring = {
  score: (id) => api.post(`/api/score/${id}`),
  getLatest: (id) => api.get(`/api/score/${id}/latest`),
  getHistory: (id) => api.get(`/api/score/${id}/history`),
}

export const copilot = {
  chat: (msmeId, message, history) =>
    api.post('/api/copilot/chat', { msmeId, message, history }),
}

export default api
