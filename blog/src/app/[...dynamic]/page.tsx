"use client";
import { useStaticPage } from "./use-static-page";

const StaticPage = (props: any) => {
  const { data, isSuccess, isLoading, error, isError } = useStaticPage(
    props.params.dynamic.join("/")
  );

  return (
   <></>
  );
}

export default StaticPage;
