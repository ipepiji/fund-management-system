import { ref } from "vue";
import { ArticleService } from "@/services";

const getArticleList = ({ id, query }: { id?: number; query?: string }) => {
  const articleList = ref([]);
  const error = ref(null);

  const load = async () => {
    try {
      let { status, data } = query
        ? await ArticleService.getListBySearch(query)
        : id
        ? await ArticleService.getDetail(id)
        : await ArticleService.getList();
      if (status !== 200) throw Error("No data available");
      articleList.value = data;
    } catch (err) {
      error.value = err.message;
      console.log(err);
    }
  };

  return { articleList, error, load };
};

export default getArticleList;
