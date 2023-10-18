import { resources, defaultNS } from "@dnt/locale";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: typeof resources["zh_CN"];
  }
}