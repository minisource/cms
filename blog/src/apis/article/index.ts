import { AxiosInstance } from "axios";
import Api from "../base";
import { TArticle } from "../../schema/article/article.type";

export default class ArticleApis extends Api {
  constructor(BASE_URL: string, axios: AxiosInstance) {
    super(BASE_URL, axios);
  }

  // گرفتن لیست اسناد از Strapi
  GetArticles = async (): TApi<TArticle[]> => {
    return await this.axios
      .get(`/api/articles`)
      .then((response) => response.data);
  };
}
