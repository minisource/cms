type TResponse<T> = {
  data: T; 
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

type TListApi = {
  page?: number;
  pageSize?: number;
};

type TApi<T> = Promise<{
  data: T;
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
  isSuccess: boolean;
  statusCode: number;
  message?: string;
}>;
