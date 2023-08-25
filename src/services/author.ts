import { axios } from "@/utils";

interface Author {
  id: string;
  name: string;
}

class AuthorService {
  static getDetail(id: number) {
    return axios.get<Author>(`/author/${id}`);
  }
}

export default AuthorService;
