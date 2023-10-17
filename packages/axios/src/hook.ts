import useSWR, { SWRResponse } from 'swr'
import { AxiosRequestConfig, AxiosResponse } from "axios";
import createAxios from './instance';

export function UseAwrRequest<R, S>(req: AxiosRequestConfig<R>): SWRResponse<AxiosResponse<S>> {
  return useSWR(req.url, () => createAxios(req))
}