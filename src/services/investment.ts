import { axios } from '@/utils'

interface Investment {
  fund_id: number
  purchased_unit: number
}

class InvestmentService {
  static Invest(form: Investment) {
    const config: any = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }

    return axios.post<any>(`/invest`, form, config).then((res) => res.data)
  }
}

export default InvestmentService
