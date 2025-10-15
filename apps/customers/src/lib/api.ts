import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND,
  timeout: 10000
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized access - should redirect to login')
    }

    if (error.response?.status >= 400) {
      const message = error.response?.data?.message || 'An error occurred'
      console.error('API Error:', message)
    }

    return Promise.reject(error)
  }
)

api.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
