import { createAxios, UseAwrRequest } from "@dnt/axios";
import { GetRoutesApiReq, GetRoutesApiRes } from "./types/route";

export const getRoutesApi = (params: GetRoutesApiReq) => createAxios<GetRoutesApiRes>({
  url: '/router/routes',
  method: 'GET',
  params
})

export const getRoutesApiSwr = (params?: GetRoutesApiReq) => UseAwrRequest<GetRoutesApiReq, GetRoutesApiRes>({
  url: '/router/routes',
  method: 'GET',
  params
})