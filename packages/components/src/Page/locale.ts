import locale from '@dnt/locale';

// com. 约定为组建多语言前缀
export const ns = 'com.Page';

locale.addResourceBundle('en_GB', ns, {
  name: 'name',
  age: 'age',
  address: 'address',
});

locale.addResourceBundle('zh_CN', ns, {
  name: '姓名',
  age: '年龄',
  address: '地址',
});

export default locale;
