export * from './common'
export * from './regex'
import { IpV4Handler } from './v4'
import { IpV6Handler } from './v6'

export const ipV4Handler = new IpV4Handler()
export const ipV6Handler = new IpV6Handler()