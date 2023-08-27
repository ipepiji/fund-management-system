import { axios } from '@/utils'

class PortfolioService {
  static getPortfolioDetails() {
    const config: any = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }

    return axios.get<any>(`/portfolio`, config).then((res) => res.data)
  }
}

export default PortfolioService
