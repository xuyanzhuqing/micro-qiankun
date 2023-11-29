export * from './common'
export * from './regex'
import { isV4Format, isV6Format } from './regex'
import { IpV4Handler } from './v4'
import { IpV6Handler } from './v6'

export const ipV4Handler = new IpV4Handler()
export const ipV6Handler = new IpV6Handler()

export enum IpFormatEnum {
  IPv4,
  IPv6,
  /**
   * 混合模式(IPv4 | IPv6)
   */
  mix
}
/**
 * 获取 ip 的版本
 */
export const getIpVersion = (ip: string): IpFormatEnum => {
  if (isV4Format(ip)) {
    return IpFormatEnum.IPv4
  }

  if (isV6Format(ip)) {
    return IpFormatEnum.IPv6
  }

  return IpFormatEnum.mix
}
