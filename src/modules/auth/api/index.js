import axios from 'axios'

export const $auth = axios.create({
  baseURL: '/api/auth',
})

$auth.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
