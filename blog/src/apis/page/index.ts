import { AxiosInstance } from "axios";
import Api from "../base";
import { TPageData } from "@/schema/page/page.type";

export default class PageApis extends Api {
  constructor(BASE_URL: string, axios: AxiosInstance) {
    super(BASE_URL, axios);
  }

  getStaticPage = async (slug: string): TApi<TPageData[]> => {
    return await this.axios
      .get(`/api/pages`, {
        params: {
          "filters[slug][$eq]": slug,
        },
      })
      .then((response) => response.data.data);
  };
}
