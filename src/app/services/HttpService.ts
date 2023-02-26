import axios from "axios";

class HttpService {
  httpClient: any;
  constructor() {
    this.httpClient = axios.create({
      baseURL: "http://localhost:3500/api",
    });
  }
}

export const httpService = new HttpService();
