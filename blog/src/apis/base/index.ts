import { AxiosInstance } from "axios";

export default class Api {
  protected BASE_URL: string;
  protected axios: AxiosInstance;

  constructor(BASE_URL: string, axios: AxiosInstance) {
    this.BASE_URL = BASE_URL;
    this.axios = axios;
  }
}
