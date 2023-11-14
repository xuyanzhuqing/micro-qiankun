export enum VersionEnum {
  origin = 'origin',
  major = 'major',
  minor = 'minor',
  patch = 'patch',
  prerelease = 'prerelease'
}

export interface Version {
  [VersionEnum.origin]: string;
  [VersionEnum.major]: number;
  [VersionEnum.minor]: number;
  [VersionEnum.patch]: number;
  [VersionEnum.prerelease]: number;
}

export default class VersionParser {
  // 1.0.0-1
  static formatRegex = /^(\d+)\.(\d+)\.?(\d+)?-?(\d+)?$/

  public output: Version

  constructor(v1: string) {
    if (!VersionParser.isValid(v1)) {
      throw new Error('Invalid version')
    }

    this.output = VersionParser.parse(v1)
  }

  static isValid(v: string) {
    if (typeof v !== 'string') {
      return false
    }
    return VersionParser.formatRegex.test(v)
  }

  static parse(v: string): Version {
    const [origin, major, minor, patch, prerelease = '0'] = v.match(VersionParser.formatRegex) || []

    return {
      origin: String(origin),
      major: parseInt(major),
      minor: parseInt(minor),
      patch: parseInt(patch),
      prerelease: parseInt(prerelease)
    }
  }

  /**
   * 版本 v1 与 v2 进行比较
   *
   * v1 > v2 = 1, v1 === v2 = 0, v1 < v2 = -1
   *
   * 由于每次比较都会 new 对象，若比较次数频繁，建议采用实例方法 compareTo
   */
  static compare(v1: string, v2: string) {
    const obj1 = new VersionParser(v1)
    return obj1.compareTo(v2)
  }

  /**
   * 当前版本 v1 与 v2 进行比较
   *
   * v1 > v2 = 1, v1 === v2 = 0, v1 < v2 = -1
   */
  compareTo(v2: string) {
    const newObj = VersionParser.parse(v2)
    const output = this.output

    const rank: VersionEnum[] = [
      VersionEnum.major,
      VersionEnum.minor,
      VersionEnum.patch,
      VersionEnum.prerelease
    ]

    while (rank.length > 0) {
      const level = rank.shift()
      if (level) {
        if (output[level] > newObj[level]) return 1
        if (output[level] < newObj[level]) return -1
      }
    }
    return 0
  }

  toJSON(): Version {
    return this.output
  }

  toString() {
    return this.output.origin
  }
}
