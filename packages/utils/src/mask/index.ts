import { Tuple } from '../ts-util'
import v4 from './v4'
import v6 from './v6'
import { ipV4Handler, ipV6Handler, isV4Format, isV6Format } from '../ip'

type KeyOfV6 = typeof v6[number][1]
type ValueOfV6 = typeof v6[number][0]
type ValueOfV4 = typeof v4[number][0]

type ValidMask = typeof v6[number][0] | typeof v6[number][1] | typeof v4[number][0]

type MaskMap = Map<KeyOfV6, {
  v6: ValueOfV6;
  v4: ValueOfV4
}>

export class Mask {
  public static maskMap: MaskMap
  public static maskMapV4 = new Map(v4)
  public static maskMapV6 = new Map(v6)

  private static masks: ValidMask[]

  static {
    const maskMap = new Map()
    for (let i = 0; i < v6.length; i++) {
      maskMap.set(v6[i][1], {
        v4: v4[i]?.[0],
        v6: v6[i][0]
      })
    }

    Mask.maskMap = maskMap as MaskMap

    Mask.masks = [
      ...Mask.maskMap.keys(),
      ...Array.from(Mask.maskMap.values()).map(mask => [mask.v4, mask.v6]).flat()
    ]
  }

  /**
   * 判断是否是合法的 ipv4 掩码
   */
  public static isValidV4(mask: string | number): boolean {
    if (typeof mask === 'number') {
      return mask % 1 === 0 && mask >= 1 && mask <= 32
    }
    const compressed = ipV4Handler.compress(mask)
    return this.masks.includes(compressed as ValidMask)
  }

  /**
   * 判断是否是合法的 ipv6 掩码
   */
  public static isValidV6(mask: string | number): boolean {
    if (typeof mask === 'number') {
      return mask % 1 === 0 && mask >= 1 && mask <= 128
    } else {
      const compressed = ipV6Handler.compress(mask.toLocaleLowerCase())
      return this.masks.includes(compressed as ValidMask)
    }
  }

  /**
   * 判断是否是合法的掩码, 不区分 ip 版本
   */
  public static isValid(mask: string | number): boolean {
    if (typeof mask === 'number') {
      return mask % 1 === 0 && mask >= 1 && mask <= 128
    } else if (isV4Format(mask)) {
      return this.isValidV4(mask)
    } else if (isV6Format(mask)) {
      return this.isValidV6(mask)
    } else {
      return false
    }
  }

  public getV4Mask(mask: number): string | undefined
  public getV4Mask(mask: string): number | undefined
  public getV4Mask(mask: string | number): number | string | undefined {
    if (typeof mask === 'number') {
      return Mask.maskMap.get(mask as any)?.v4
    } else {
      return Mask.maskMapV4.get(mask as any)
    }
  }

  public getV6Mask(mask: number): string | undefined
  public getV6Mask(mask: string): number | undefined
  public getV6Mask(mask: number | string): string | number | undefined {
    if (typeof mask === 'number') {
      return Mask.maskMap.get(mask as any)?.v6
    } else {
      return Mask.maskMapV6.get(mask as any)
    }
  }
}

export default new Mask()