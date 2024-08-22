import { ResponseType } from "axios";
import api from "./axiosConfig";

export const apiGet = async (
  url: string,
  responseType: ResponseType = "json",
  baseURL?: string,
  token?: string
) => {
  return await api(baseURL, token).get(url, { responseType });
};

export const apiPost = async (
  url: string,
  body: object,
  baseURL?: string,
  token?: string
) => {
  return await api(baseURL, token).post(url, body);
};

export const apiPut = async (
  url: string,
  body: object,
  baseURL?: string,
  token?: string
) => {
  return await api(baseURL, token).put(url, body);
};

export const apiDelete = async (
  url: string,
  baseURL?: string,
  token?: string
) => {
  return await api(baseURL, token).delete(url);
};
