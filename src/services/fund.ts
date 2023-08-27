import { axios } from '@/utils'

class FundService {
  static getFundList() {
    const config: any = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }

    return axios.get<any>(`/fund`, config).then((res) => res.data)
  }
}

export default FundService
