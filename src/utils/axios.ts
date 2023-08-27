import axios from 'axios'

let config: any = {
  baseURL: import.meta.env.VITE_API_URL
}

if (localStorage.getItem('token'))
  config = {
    ...config,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }

const service = axios.create(config)

export default service
