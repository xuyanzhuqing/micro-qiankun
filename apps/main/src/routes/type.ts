import { Language } from "@dnt/locale";

export interface DntMicroMenuProps {
  container: string;
  entry: string;
}

export interface DntPureMenuProps {
  path: string;
  key: string;
  lang: Record<Language, string>;
  icon?: string;
  routes?: Array<DntMicroMenuProps & DntPureMenuProps | DntPureMenuProps>;
  element: string;
}