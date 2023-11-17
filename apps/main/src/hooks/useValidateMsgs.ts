/**
 * 全局自定义配置 Form 表单校验多语言
 */
import { useTranslation } from "react-i18next";

export function useValidateMsgs() {
  const { t } = useTranslation('validateMessages');

  const validateMessages = {
    required: t('required'),
    string: {
      min: t('string', { returnObjects: true }).min,
    },
  };

  return validateMessages
}