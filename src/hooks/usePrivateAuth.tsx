import { refreshTokens } from "../services/token";
import axios from "axios";

const useAxiosPrivate = () => {

  const axiosPrivate = axios.create();
  const token = localStorage.getItem('access_token');
  axiosPrivate.interceptors.request.use(
    config => {
      if (!config.headers['Authorization']) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    }, (error) => Promise.reject(error)
  );

  axiosPrivate.interceptors.response.use(
    response => response,
    async (error) => {
      const prevRequest = error?.config;
      if (error?.response?.status === 403 && !prevRequest?.sent) {
        console.log('Asheley, look at me!');
        prevRequest.sent = true;
        const newAccessToken = await refreshTokens();
        prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosPrivate(prevRequest);
      }
      return Promise.reject(error);
    }
  );

  return axiosPrivate;
}

export default useAxiosPrivate;