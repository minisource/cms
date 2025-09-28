import {
  // ContextOptions,
  MutationFunction,
  QueryFunction,
  QueryKey,
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  UseInfiniteQueryResult
} from "@tanstack/react-query";
import { AxiosError } from "axios";

export type TUseApiFunction<T> = QueryFunction<TResponse<T>>;
export type TUseApiOptions<T> = Omit<
  UseQueryOptions<TResponse<T>, AxiosError, TResponse<T>, QueryKey>,
  "queryKey" | "queryFn"
>;
export type TUseApi<T> = UseQueryResult<TResponse<T>, Error>;

export type TUseMutateApiFunction<T, TVariables> = MutationFunction<
  TResponse<T>,
  TVariables
>;
export type TUseMutateApiOptions<T, TVariables> = UseMutationOptions<
  TResponse<T>,
  AxiosError,
  TVariables
>;
export type TUseMutateApi<T, TVariables> = UseMutationResult<
  TResponse<T>,
  Error,
  TVariables
  // ContextOptions  //fix this not in @tanstack/react-query
>;

export type TUseInfiniteApiFunction<T> = QueryFunction<TResponse<T>>;
export type TUseInfiniteApiOptions<T> = Omit<
  UseInfiniteQueryOptions<
    TResponse<T>,
    AxiosError,
    TResponse<T>,
    any,
    QueryKey
  >,
  "queryKey" | "queryFn"
>;

export type TUseInfiniteApi<T> = UseInfiniteQueryResult<TResponse<T>, Error>
