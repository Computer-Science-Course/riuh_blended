import { axiosPrivate } from "../api/axios";
import { refreshTokens } from "../services/token";

/** @description Personalized axios instance to use interceptors. */
const useAxiosPrivate = () => {

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
      if (error?.response?.status === 401 && !prevRequest?.sent) {
        /** Log out when cannot get new token with refresh token. */
        const tokenSent = prevRequest.headers['Authorization'].replace('Bearer ', '');
        const currentRefreshToken = localStorage.getItem('refresh_token');
        if (tokenSent === currentRefreshToken){
          /** TODO: Reuse login from logout function AuthContext.tsx */
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          location.reload();
        }

        console.log('Ashley, look at me!');
        prevRequest.sent = true;
        const newAccessToken = await refreshTokens();
        prevRequest.headers['Authorization'] = `Bearer ${newAccessToken?.accessToken}`;
        return axiosPrivate(prevRequest);
      }
      return Promise.reject(error);
    }
  );

  return axiosPrivate;
}

export default useAxiosPrivate;