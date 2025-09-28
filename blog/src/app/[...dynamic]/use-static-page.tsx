
import { useApi } from "../hooks/use-api";
import PageApis from "@/apis/page";
import Axios from "@/utils/axios";

export const useStaticPage = (slug: string) => {
  const KEY = ["StaticPage", slug];
  const pageApi = new PageApis("", Axios());
  const { data, error, isSuccess, refetch, isLoading, isError } = useApi(
    KEY,
    () => pageApi.getStaticPage(slug)
  );

  return {
    data: isSuccess ? data.data : null,
    isLoading,
    isSuccess,
    refetch,
    isError,
    error,
  };
};
