import { axios } from '@/utils'

class PerformanceHistoryService {
  static getPerformanceHistoryList(fundId: number) {
    return axios.get<any>(`/performance-history?fund_id=${fundId}`).then((res) => res.data)
  }
}

export default PerformanceHistoryService
