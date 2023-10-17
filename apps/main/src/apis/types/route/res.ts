import { ObjectType, RegistrableApp } from "qiankun/es/interfaces";
import { BasicRes } from "../basic-res";
interface RoutesConfig {
  id: number;
  name: string;
  entry: string;
  container: string;
  activeRule: string;
  mode: 1 | 0
}

export interface GetRoutesApiRes extends BasicRes<RoutesConfig[]> { }