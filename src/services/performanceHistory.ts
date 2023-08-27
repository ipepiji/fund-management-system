import { axios } from '@/utils'

class PerformanceHistoryService {
  static getPerformanceHistoryList(fundId: number) {
    const config: any = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }

    return axios.get<any>(`/performance-history?fund_id=${fundId}`, config).then((res) => res.data)
  }
}

export default PerformanceHistoryService
