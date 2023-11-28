import locale from '@dnt/locale';

// com. 约定为组建多语言前缀
export const ns = 'com.form.item.mask';

locale.addResourceBundle('en_GB', ns, {
  tip: 'unknown format of the ${label} ',
});

locale.addResourceBundle('zh_CN', ns, {
  tip: '${label} 格式不正确',
});

export default locale;
