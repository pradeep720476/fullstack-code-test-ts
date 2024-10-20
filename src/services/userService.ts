import axios from "axios";
import { buildQueryParam, url } from "../utils/serviceHelper";
import { API_RESOUCE } from "../utils/constant";
import api from "./api";

export const getUsers = async (queryParam: Record<string, any>) => {
  const query = buildQueryParam(queryParam);
  try {
    const response = await api.get(`${url(API_RESOUCE.users)}?${query}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUser = async (id: number) => {
  try {
    const response = await axios.get(`${url(API_RESOUCE.user)}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
