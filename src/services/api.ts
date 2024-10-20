import axios, { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
});

// Can be modified for request to add any authentication related.
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

//Can be modified for common response handlers related to Ombori
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
        case 403:
            //Can add ant common errors
          break;
        case 500:
        default:
          return Promise.reject(error);
      }
    }
  },
);


export default api;
