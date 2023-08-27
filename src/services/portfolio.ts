import { axios } from '@/utils'

class PortfolioService {
  static getPortfolioDetails() {
    return axios.get<any>(`/portfolio`).then((res) => res.data)
  }
}

export default PortfolioService
