import { ref } from "vue";
import { CategoryService } from "@/services";

const getCategoryList = () => {
  const categoryList = ref([]);
  const error = ref(null);

  const load = async () => {
    try {
      let { status, data } = await CategoryService.getList();
      if (status !== 200) throw Error("No data available");
      categoryList.value = data;
    } catch (err) {
      error.value = err.message;
      console.log(err);
    }
  };

  return { categoryList, error, load };
};

export default getCategoryList;
