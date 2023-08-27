import { axios } from '@/utils'

class FundService {
  static getFundList() {
    return axios.get<any>(`/fund`).then((res) => res.data)
  }
}

export default FundService
