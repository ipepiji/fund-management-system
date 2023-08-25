import { axios } from "@/utils";

interface Category {
  id: string;
  title: string;
  description: string;
  createdOn: string;
  updatedOn: string;
  enabled: boolean;
  order: number;
  icon: string;
  totalArticle: number;
}

class CategoryService {
  static getList() {
    return axios.get<Category[]>(`/categories`);
  }
}

export default CategoryService;
