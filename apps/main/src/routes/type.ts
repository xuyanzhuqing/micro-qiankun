import { Language } from "@dnt/locale";

export interface DntPureMenuProps {
  path: string;
  key: string;
  lang: Record<Language, string>;
  icon?: string;
  routes?: DntPureMenuProps[];
  element: string;
  // TODO： 权限设计
  code?: string;
  container?: string;
  entry?: string;
  desc?: string;
}