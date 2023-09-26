import { createAxios } from "@dnt/axios/lib";
import { LoginApiReq, LoginApiRes, LogoutApiRes } from "./types/auth";

export const loginApi = (data: LoginApiReq) => createAxios<LoginApiRes>({
  url: '/auth/login',
  data,
  method: 'POST',
})

// export const logoutApi = () => UseRequest<any, LogoutApiRes>({
//   url: '/auth/logout',
//   data: 'post'
// })

export const logoutApi = () => createAxios<LogoutApiRes>({
  url: '/auth/logout',
  method: 'POST'
})