import { AxiosError } from "axios";
import {
  useQuery,
  QueryKey,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  TUseMutateApiFunction,
  TUseMutateApiOptions,
  TUseApi,
  TUseApiFunction,
  TUseApiOptions,
  TUseMutateApi,
  TUseInfiniteApiFunction,
  TUseInfiniteApiOptions,
  TUseInfiniteApi,
} from "./use-api.type";
import useErrorHandler from "../use-error-handler";
import { CACHE_TIME } from "@/apis/constant";

export const useApi = <T,>(
  key: QueryKey,
  fn: TUseApiFunction<T>,
  options?: TUseApiOptions<T>
): TUseApi<T> => {
  return useQuery<TResponse<T>, AxiosError<any, any>>({
    queryKey: key,
    queryFn: fn,
    ...options,
    staleTime: CACHE_TIME.SHORT,
    gcTime: CACHE_TIME.NORMAL,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

export const useInfiniteApi = <T,>(
  key: QueryKey,
  fn: TUseInfiniteApiFunction<T>,
  options?: TUseInfiniteApiOptions<T>
) => {
  //TUseInfiniteApi<T>
  // return useInfiniteQuery<TResponse<T>, AxiosError<any, any>, any>({
  //   queryKey: key,
  //   queryFn: fn,
  //   staleTime: CACHE_TIME.SHORT,
  //   gcTime: CACHE_TIME.NORMAL,
  //   retry: 1,
  //   refetchOnWindowFocus: false,
  //   ...options,
  // });
};

export const useMutateApi = <T, TVariables>(
  fn: TUseMutateApiFunction<T, TVariables>,
  resetKeys?: QueryKey,
  options?: TUseMutateApiOptions<T, TVariables>,
  withErrorHandler?: boolean
): TUseMutateApi<T, TVariables> => {
  const client = useQueryClient();
  const { handleError } = useErrorHandler();

  return useMutation<TResponse<T>, AxiosError, TVariables, any>({
    mutationKey: resetKeys,
    mutationFn: fn,
    // onError: (error, variables, context) => {
    //   options?.onError?.(error, variables, context);
    //   if (withErrorHandler === undefined || withErrorHandler === true)
    //     handleError(error);
    // },
    // onSettled: (data: any, error: any, variables: any, context: any) => {
    //   options?.onSettled?.(data, error, variables, context);
    //   if (resetKeys) {
    //     if (Array.isArray(resetKeys[0]))
    //       resetKeys.forEach((key: any) =>
    //         client.invalidateQueries({ queryKey: key })
    //       );
    //     else client.invalidateQueries({ queryKey: resetKeys });
    //   }
    // },
    retry: false,
    ...options,
  });
};
