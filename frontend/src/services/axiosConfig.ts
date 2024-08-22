import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

function apiConfig(baseUrl: string | undefined): AxiosRequestConfig {
  return {
    baseURL: baseUrl,
  };
}

function initAxios(config: AxiosRequestConfig, token?: string): AxiosInstance {
  const defineInstance = axios.create(config);

  // Interceptor de requisição para adicionar token ao cabeçalho
  defineInstance.interceptors.request.use(
    (request: InternalAxiosRequestConfig) => {
      if (token) {
        request.headers.Authorization = `Bearer ${token}`;
      }
      return request;
    },
    (error) => Promise.reject(error)
  );

  // Interceptor de resposta para tratamento de erros
  defineInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      // Em vez de alert, usar um mecanismo de logging
      console.error("API call error:", error);
      return Promise.reject(error);
    }
  );

  return defineInstance;
}

function api(baseURL = apiUrl, token?: string) {
  return initAxios(apiConfig(baseURL), token);
}

export default api;
