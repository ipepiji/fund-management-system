import { axios } from "@/utils";

interface Article {
  id: string;
  title: string;
  createdOn: string;
  updatedOn: string;
  authorId: string;
  content: string;
  icon: string;
  status: string;
}

class ArticleService {
  static getDetail(id: number) {
    return axios.get<Array<Article>>(`/category/${id}`);
  }

  static getList() {
    return axios.get<Array<Article>>(`/category/*`);
  }

  static getListBySearch(query: string) {
    return axios.get<Array<Article>>(`/search/${query}`);
  }
}

export default ArticleService;
