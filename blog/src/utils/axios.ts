"use client";
import axios, { AxiosInstance } from "axios";

let CustomAxios: AxiosInstance;

const Axios = (): AxiosInstance => {
  if (axios.defaults) {
    CustomAxios = axios.create({
      withCredentials: false,
      baseURL:
        process.env.CMS_API_URL || "http://localhost:1337",
    });

    CustomAxios.interceptors.request.use(
      async (config) => {
        const token = process.env.CMS_API_TOKEN;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    CustomAxios.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(error)
    );
  } else {
    CustomAxios = axios;
  }

  return CustomAxios;
};

export { CustomAxios };
export default Axios;
