import axios, { AxiosError } from "axios";
import store from "configStore";

const axiosClient = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/api",
  headers: {
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udCBFbmQgNzEiLCJIZXRIYW5TdHJpbmciOiIxMS8xMi8yMDIyIiwiSGV0SGFuVGltZSI6IjE2NzA3MTY4MDAwMDAiLCJuYmYiOjE2NDU5ODEyMDAsImV4cCI6MTY3MDg2NDQwMH0.hImF3FD5ezlSpmo_fyOBeTlwLGcUfxyEeZIRIddaRFE",
  },
});

axiosClient.interceptors.request.use((config) => {
  if (config.headers) {
    const { accessToken = "" } = (store.getState().auth.user as any) || {};
    if (accessToken) {
      config.headers.accessToken = `Bearer ${accessToken}`;
    }
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response.data.content;
  },
  (error: AxiosError<{ content: string }>) => {
    return Promise.reject(error.response?.data.content);
  }
);

export default axiosClient;
