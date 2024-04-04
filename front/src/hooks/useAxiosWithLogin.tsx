// import { axiosPrivate } from "../api/axios";
// import { fetchTokens } from "../services/login";
// import { JwtPayload } from "../services/login/LoginProps";

// /** @description First it does a login to get fresh tokens,
//  * then it does the main request. */
// const useAxiosWithLogin = () => {
//   axiosPrivate.interceptors.request.use(
//     config => {

//       const response = await fetchTokens('username', 'password');
//       const responseData: JwtPayload = await response.data;
//       localStorage.setItem('access_token', responseData.access_token);

//       return config;
//     }, (error) => Promise.reject(error)
//   );

//   axiosPrivate.interceptors.response.use(
//     response => response,
//     async (error) => {

//       const prevRequest = error?.config;
//       return axiosPrivate(prevRequest);
//       // if (error?.response?.status === 401 && !prevRequest?.sent) {
//       //   /** Log out when cannot get new token with refresh token. */
//       //   const tokenSent = prevRequest.headers['Authorization'].replace('Bearer ', '');
//       //   const currentRefreshToken = localStorage.getItem('refresh_token');
//       //   if (tokenSent === currentRefreshToken){
//       //     /** TODO: Reuse login from logout function AuthContext.tsx */
//       //     localStorage.removeItem('access_token');
//       //     localStorage.removeItem('refresh_token');
//       //     location.reload();
//       //   }

//       //   console.log('Ashley, look at me!');
//       //   prevRequest.sent = true;
//       //   const newAccessToken = await refreshTokens();
//       //   prevRequest.headers['Authorization'] = `Bearer ${newAccessToken?.accessToken}`;
//       //   return axiosPrivate(prevRequest);
//       // }
//       return Promise.reject(error);
//     }
//   );

//   return axiosPrivate;
// }

// export default useAxiosWithLogin;