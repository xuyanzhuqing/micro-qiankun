文件命名规范
<small>https://ant-design.antgroup.com/docs/react/i18n-cn</small>

语言	文件名
阿拉伯语	ar_EG
阿塞拜疆语	az_AZ
保加利亚语	bg_BG
孟加拉语（孟加拉国）	bn_BD
白俄罗斯语	by_BY
加泰罗尼亚语	ca_ES
捷克语	cs_CZ
丹麦语	da_DK
德语	de_DE
希腊语	el_GR
英语	en_GB
英语（美式）	en_US
西班牙语	es_ES
巴斯克语	eu_ES
爱沙尼亚语	et_EE
波斯语	fa_IR
芬兰语	fi_FI
法语（比利时）	fr_BE
法语（加拿大）	fr_CA
法语（法国）	fr_FR
爱尔兰语	ga_IE
加利西亚语（西班牙）	gl_ES
希伯来语	he_IL
印地语	hi_IN
克罗地亚语	hr_HR
匈牙利语	hu_HU
亚美尼亚	hy_AM
印度尼西亚语	id_ID
意大利语	it_IT
冰岛语	is_IS
日语	ja_JP
格鲁吉亚语	ka_GE
高棉语	km_KH
北库尔德语	kmr_IQ
卡纳达语	kn_IN
哈萨克语	kk_KZ
韩语/朝鲜语	ko_KR
立陶宛语	lt_LT
拉脱维亚语	lv_LV
马其顿语	mk_MK
马拉雅拉姆语	ml_IN
蒙古语	mn_MN
马来语 (马来西亚)	ms_MY
缅甸语	my_MM
挪威语	nb_NO
尼泊尔语	ne_NP
荷兰语（比利时）	nl_BE
荷兰语	nl_NL
波兰语	pl_PL
葡萄牙语(巴西)	pt_BR
葡萄牙语	pt_PT
罗马尼亚语	ro_RO
俄罗斯语	ru_RU
僧伽罗语	si_LK
斯洛伐克语	sk_SK
塞尔维亚语	sr_RS
斯洛文尼亚语	sl_SI
瑞典语	sv_SE
泰米尔语	ta_IN
泰语	th_TH
土耳其语	tr_TR
土库曼	tk_TK
乌尔都语 (巴基斯坦)	ur_PK
乌克兰语	uk_UA
越南语	vi_VN
简体中文	zh_CN
繁体中文（中国香港）	zh_HK
繁体中文（中国台湾）	zh_TW

多语言代码提示
```typescript
// 新增 src/types/i18next.d.ts
import { resources, defaultNS } from "@dnt/locale";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: typeof resources["zh_CN"];
  }
}
```