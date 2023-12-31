export type Bite = 0 | 1

export interface Subnet {
  /**
   * 网络地址
   */
  network: string;
  /**
   * 第一个可用地址
   */
  firstAddress: string;
  /**
   * 最后一个可用地址
   */
  lastAddress: string;
  /**
   * 广播地址
   */
  broadcastAddress: string;
  /**
   * 可用 ip 数量
   */
  available: number
}

export abstract class IpAbstract {
  /**
   * cache ip 与其对应的 bite 数组
   */
  public convertCache = new Map<string, Bite[]>()

  /**
   * 实现思路
   *
   * 1. 计算 ip 的 network, firstAddress（network 后一个地址），计算出 network 跟 broadcastAddress, lastAddress（广播地址的前一个地址）
   * 2. 若 ip === network || ip === broadcastAddress 则舍弃，同网段的 ip 依次取出
   * 3. 若不提供 mask, 则默认递增
   */
  abstract calculateAddresses(ip: string, count: number, mask: string): string[];
  abstract calculateAddresses(ip: string, count: number, mask: number): string[];
  abstract calculateAddresses(cidr: string, count: number): string[];
  /**
   * 实现思路
   *
   * 1. 根据 mask 判断 startIp 与 endIp 是否是同网段 ip
   * 2. 若不提供 mask, 则默认递增
   * 3. 若 mask 存在则取 int 值小的 ip 作为 startIp
   */
  abstract calculateAddressRange(startIp: string, endIp: string, mask?: string | number): string[];

  /**
   * 实现思路
   *
   * 1. 通过计算出 ip 的起始范围
   * 2. 判断 ip 的范围
   */
  contains(network: string, mask: string): (ip: string) => boolean {
    const subInfo = this.subnet(network, mask)
    const min = this.ipToLong(subInfo.firstAddress)
    const max = this.ipToLong(subInfo.lastAddress)
    return ip => {
      const n = this.ipToLong(ip)
      return min <= n && n <= max
    }
  }
  /**
   *
   * 1. ip1 与 ip2 从高位到低位比较 e.g. ip1 > ip2 = 1
   */
  public compare(ip1: string, ip2: string): 0 | 1 | -1 {
    const long1 = this.ipToLong(ip1)
    const long2 = this.ipToLong(ip2)

    if (long1 === long2) {
      return 0
    }

    if (long1 > long2) {
      return 1
    }

    return -1
  }
  /**
   * 将二进制数组转化为字符 ip 形式
   */
  abstract convertBinaryToIp(bites: Bite[]): string
  /**
   * 将 ip 字符转换为二进制数组
   */
  abstract convertIPtoBinary(ip: string): Array<Bite>

  /**
   * 将 ip 扩充为扩展形式 高位补零
   */
  abstract expand(ip: string): string

  /**
   * 将 ip 格式化为最小表现形式 高位去零
   */
  abstract compress(ip: string): string
  /**
   * 将 ip 转化为数字
   */
  abstract ipToLong(ip: string): number | BigInt
  /**
   * 将 数字 转化为 ip
   */
  abstract longToIP(ip: number | BigInt): string
  /**
   * 获取网段信息
   */
  abstract subnet(ip: string, mask: string | number): Subnet
  /**
   * 实现思路
   * 1. 将 mask 按位取反
   * 2. 分别与 ip1， ip2 进行与操作得出 network1 network2
   * 3. 比较 network1 network2
   */
  isSameNetwork(ip1: string, ip2: string, mask: string): boolean {
    const maskBites = this.convertIPtoBinary(mask)
    const ip1Bits = this.convertIPtoBinary(ip1)
    const ip2Bits = this.convertIPtoBinary(ip2)
    const len = maskBites.length
    for (let i = 0; i < len; i++) {
      // 若存在与之后的值不相等，则说明不是同网段
      if ((maskBites[i] & ip1Bits[i]) !== (maskBites[i] & ip2Bits[i])) {
        return false
      }
    }
    return true
  }

  /**
   * 高位补零
   */
  toFixedZero(fragment: string, rank: number) {
    return ['0'.repeat(rank - fragment.length), fragment].join('')
  }

  /**
   * 高位去零
   */
  toDropZero(fragment: string) {
    const atLeastOne = '0'
    return fragment.replaceAll(/^0+/g, '') || atLeastOne
  }

  /**
   * 按位取或
   */
  or(ip1: string, ip2: string): Bite[] {
    const bites1 = this.convertIPtoBinary(ip1)
    const bites2 = this.convertIPtoBinary(ip2)
    const res: Bite[] = bites1.map((bit1, index) => {
      return (bit1 | bites2[index]) as Bite
    })
    return res
  }

  /**
   * 按位取与
   */
  and(ip1: string, ip2: string): Bite[] {
    const bites1 = this.convertIPtoBinary(ip1)
    const bites2 = this.convertIPtoBinary(ip2)

    const res: Bite[] = bites1.map((bit1, index) => {
      return (bit1 & bites2[index]) as Bite
    })
    return res
  }
  /**
   * 按位取反
   */
  not(ip: string): Array<Bite> {
    const bites = this.convertIPtoBinary(ip)
    return bites.map(bit => bit ? 0 : 1)
  }
}