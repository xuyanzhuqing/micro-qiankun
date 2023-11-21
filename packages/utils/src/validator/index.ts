type Validator = (rule: any, value: any, callback: (error?: string) => void) => Promise<void | any> | void;


function make(regex: RegExp, zh_CN: string, en_GB: string): { validator: Validator } {
  return {
    validator: (rule, value) => {
      if (regex.test(value)) {
        return Promise.resolve()
      } else {
        const lng = localStorage.getItem('i18nextLng') || 'zh_CN'
        return Promise.reject(new Error(lng === 'zh_CN' ? zh_CN : en_GB))
      }
    }
  }
}

export const validatorChar = make(/^[A-Za-z0-9_]*$/, '请输入数字字母下划线', 'english')

export const validatorNoSpace = make(/(^\S)((.)*\S)?(\S*$)/, '前后不能有空格', 'There must be no space before or after')

/**
 * 校验手机号段 https://www.qqzeng.com/article/phone.html
 *
 * 移动号段：
 * 134 135 136 137 138 139 147 148 150 151 152 157 158 159 172 178 182 183 184 187 188 195 198
 * 联通号段：
 *
 * 130 131 132 145 146 155 156 166 167 171 175 176 185 186 196
 * 电信号段：
 *
 * 133 149 153 173 174 177 180 181 189 190 191 193 199
 * 虚拟运营商:
 *
 * 162 165 167 170 171
 * 广电号段:
 *
 * 192
 *
 * 由于经常会有新号段出现，故而不做精确限制
 */
export const validatorMobilePhone = make(/^1[3-9]\d{9}/, '手机号格式不正确', 'The format of the mobile phone number is incorrect')

export const validatorEmail = make(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, '邮箱格式不正确', 'The format of the email is incorrect')