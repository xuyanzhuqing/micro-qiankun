/**
 * 十六进制字符转换
 */
import { RangeNumber } from './ts-util'
import baseCov from './base-conversion'

const hexLowerCase = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'] as const

type Char = typeof hexLowerCase[number]

type Bite = 0 | 1

type Bites = [Bite, Bite, Bite, Bite]

type Range = RangeNumber<0, 16>

export default class Hex {
  static size = 16

  static hexLowerCase = hexLowerCase

  // 根据字符翻译为 10 进制
  static getInt(char: Char): Range {
    if (/^\d$/.test(char)) {
      return parseInt(char) as Range
    }

    return this.hexLowerCase.findIndex((v) => v === char.toLocaleLowerCase()) as Range
  }

  static getChar(n: Range): Char {
    return this.hexLowerCase[n]
  }

  static getBitesByChar(): (char: Char) => Bites {
    const cached = this.getBitesByInt()
    return (char) => {
      const n = this.getInt(char)
      return cached(n)
    }
  }

  static getBitesByInt(): (n: Range) => Bites {
    const cache = new Map<Range, Bites>()
    return (n) => {
      if (cache.has(n)) {
        return cache.get(n) as Bites
      }
      const res = baseCov<Bites>(n, 2, [0, 0, 0, 0])
      cache.set(n, res)
      return res
    }
  }
}