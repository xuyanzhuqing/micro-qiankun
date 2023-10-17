import locale from '@dnt/locale';

export const ns = 'com.Start';

locale.addResourceBundle('en_GB', ns, {
  welcome: 'welcome to components',
});

locale.addResourceBundle('zh_CN', ns, {
  welcome: '欢迎来到组建的世界',
});

export default locale;
