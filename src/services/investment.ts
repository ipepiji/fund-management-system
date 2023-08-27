import { axios } from '@/utils'

interface Investment {
  fund_id: number
  purchased_unit: number
}

class InvestmentService {
  static Invest(form: Investment) {
    return axios.post<any>(`/invest`, form).then((res) => res.data)
  }
}

export default InvestmentService
