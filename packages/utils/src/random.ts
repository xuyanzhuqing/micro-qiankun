/**
 * [Random 随机生成文本]
 */
export class Random {
  private prefix = ''

  private suffix = ''

  private length = 6

  public static readonly lowerLetters: string[] = new Array(26).fill(97).map((v, i) => String.fromCharCode(v + i))

  public static readonly upperLetters: string[] = new Array(26).fill(65).map((v, i) => String.fromCharCode(v + i))

  public static readonly numbers: number[] = new Array(10).fill(1).map((v, i) => v * i)

  private specialCharacters: string[] = []

  private characters: Array<string | number> = []

  /**
   * 默认值支持小写，数字，长度为6个字符
   */
  constructor(
    {
      /**
       * [随机长度]
       */
      length = 6,
      /**
       * [特殊字符]
       */
      specialCharacters = [],
      /**
       * 前缀
       */
      prefix = '',
      /**
       * 后缀
       */
      suffix = '',
      /**
       * 是否包含小写字母
       */
      lower = true,
      /**
       * 是否包含大写字母
       */
      upper = false,
      /**
       * 是否包含数字
       */
      number = true
    } = {}) {
    this.length = length
    this.prefix = prefix
    this.suffix = suffix
    this.specialCharacters = specialCharacters

    const characters: Array<string | number> = []
    if (lower) {
      characters.push(...Random.lowerLetters)
    }

    if (upper) {
      characters.push(...Random.upperLetters)
    }

    if (number) {
      characters.push(...Random.numbers)
    }

    if (specialCharacters.length > 0) {
      characters.push(...specialCharacters)
    }

    this.characters = Array.from(new Set(characters))
  }

  make(): string {
    const randoms: Array<string | number> = []
    const characters = this.characters
    for (let i = 0; i < this.length; i++) {
      const index = Math.floor(Math.random() * characters.length)
      randoms.push(characters[index])
    }

    const res: Array<string | number> = [
      this.prefix,
      ...randoms,
      this.suffix
    ]
    return res.join('')
  }
}

export default Random
