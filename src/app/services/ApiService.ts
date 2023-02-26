import { httpService } from "./HttpService";

export default class ApiService {
  client: any;
  constructor() {
    this.client = httpService.httpClient;
  }
}
