import axios, { isCancel, AxiosError } from 'axios';
const BASE_URL = "https://5fc9346b2af77700165ae514.mockapi.io"


const eterationAPI = axios.create({
  baseURL: BASE_URL,
  headers: {}
});

eterationAPI.interceptors.request.use((config) => config);
eterationAPI.interceptors.response.use((config) => config);

export const EterationAPIService = {
  GetProducts: () => eterationAPI.get(`${BASE_URL}/products`)
}