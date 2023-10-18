import { resources, defaultNS } from "@dnt/locale/lib";
import { localResources } from '../i18n'

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: typeof resources["zh_CN"] & typeof localResources['zh_CN'];
  }
}