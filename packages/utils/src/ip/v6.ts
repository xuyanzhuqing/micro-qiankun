import { Bite, IpAbstract, Subnet } from "./common"
import Big from 'big.js'
import maskInstance, { Mask } from '../mask';
import maskUtil from '../mask'

export class IpV6Handler extends IpAbstract {
  calculateAddresses(ip: string, count: number, mask?: string | number): string[] {
    let strMask: string | undefined
    if (typeof mask === 'number') {
      strMask = maskUtil.getV6Mask(mask)
    } else {
      strMask = mask
    }

    let firstLongAddress = this.ipToLong(ip)
    const res: string[] = []

    // 不考虑同网段的情况
    if (strMask === undefined) {
      for (let i = 0; i < count; i++) {
        res.push(this.longToIP(firstLongAddress + BigInt(i)))
      }
      return res
    }


    const subnet = this.subnet(ip, strMask)
    for (let i = 0; i < count && i < subnet.available; i++) {
      res.push(this.longToIP(firstLongAddress + BigInt(i)))
    }
    return res
  }
  calculateAddressRange(startIp: string, endIp: string, mask?: string | number | undefined): string[] {
    let strMask: string | undefined
    if (typeof mask === 'number') {
      strMask = maskUtil.getV6Mask(mask)
    } else {
      strMask = mask
    }

    let start = this.ipToLong(startIp)
    let end = this.ipToLong(endIp)

    if (end < start) {
      [start, end] = [end, start]
    }

    const res: string[] = []
    // 不考虑同网段的情况
    if (strMask === undefined) {
      while (start <= end) {
        res.push(this.longToIP(start++))
      }
      return res
    }

    // 考虑同网段的情况下
    const subnet = this.subnet(end < start ? endIp : startIp, strMask)
    let i = 0
    while (start <= end && i < subnet.available) {
      res.push(this.longToIP(start++))
      i++
    }
    return res
  }
  convertBinaryToIp(bites: Bite[]): string {
    const res = new Array(8)
    let oct
    for (let i = 0; i < 8; i++) {
      oct = bites.slice(i * 16, (1 + i) * 16).join('')
      res[i] = parseInt(oct, 2).toString(16)
    }
    return res.join(':')
  }
  convertIPtoBinary(ip: string): Bite[] {
    const cache = this.convertCache.get(ip)
    if (cache) {
      return [...cache]
    }

    const hexes = this.expand(ip).split(':')
    const binaryHexes = hexes.map((hex) => {
      return parseInt('0x' + hex)
        .toString(2)
        .padStart(16, "0")
        .split('')
        .map(v => parseInt(v, 10) ? 1 : 0)
    })

    const res = binaryHexes.flat()
    this.convertCache.set(ip, res)
    return res
  }
  expand(ip: string): string {
    const abbrIndex = ip.indexOf('::')
    const fragments = ip.split(':')
    if (abbrIndex > -1) {
      ip = ip.slice(0, abbrIndex).concat(':0000'.repeat(8 - fragments.length + 1)).concat(ip.slice(abbrIndex + 1, ip.length))
    }
    return ip.split(':').map(v => v.padStart(4, '0')).join(':')
  }
  compress(ip: string): string {
    const fragments = ip.split(':')
      .map(v => v.replace(/^0+/g, '') || '0')

    let start = 0
    let count = 0

    let innerCount = 0
    let j = 0
    // 找出最长的一段 0:0:0... 替换为 ::
    for (let i = 0; i < fragments.length - 1; i++) {
      innerCount = 0
      j = i + 1
      const current = fragments[i]
      let next = fragments[j]

      while (current === next && current === '0') {
        next = fragments[j++]
        innerCount++
      }

      if (innerCount > count) {
        count = innerCount
        start = i
      }

      if (i + innerCount >= fragments.length) {
        break
      }
    }

    const firstPart = fragments.slice(0, start)
    const lastPart = fragments.slice(start + count, fragments.length)

    if (firstPart.length > 0 && lastPart.length > 0) {
      return firstPart.join(':').concat('::').concat(lastPart.join(':'))
    }

    if (firstPart.length > 0) {
      return firstPart.join(':').concat('::')
    }

    if (lastPart.length === 8) {
      return lastPart.join(':')
    }

    if (lastPart.length > 0 && lastPart.length < 8) {
      return '::'.concat(lastPart.join(':'))
    }

    return '::'
  }
  ipToLong(ip: string): bigint {
    const parts = this.expand(ip).split(':');
    let decimal = 0n
    let base = 65536n
    for (let i = 0; i < 8; i++) {
      decimal = decimal + BigInt(parseInt(parts[i], 16)) * base ** BigInt((8 - i - 1))
    }
    return decimal;
  }
  longToIP(n: bigint): string {
    let big = Big(n.toString())
    var arr = new Array(8).fill('0')
    var i = 7
    var mod
    while (big.gt(0)) {
      mod = big.mod(65536)
      arr[i--] = mod.toNumber().toString(16)
      big = big.minus(mod).div(65536)
    }
    return arr.join(':')
  }
  subnet(ip: string, mask: string): Subnet {
    // https://jennieji.github.io/subipv6/
    const cidrMask = maskInstance.getV6Mask(mask)
    if (cidrMask === undefined) {
      throw new Error(`invalid CIDR subnet: ${mask}`)
    }

    const baseIp = this.convertIPtoBinary(ip).slice(0, cidrMask)
    const rest = new Array(128 - baseIp.length)
    const minIp = baseIp.concat(rest.fill(0))
    const maxIp = baseIp.concat(rest.fill(1))

    const network = this.and(mask, ip)
    const networkId = []

    for (let i = 0; i < network.length; i += 16) {
      networkId.push(parseInt(network.slice(i, i + 16).join(''), 2).toString(16))
    }

    const firstAddress = this.expand(this.convertBinaryToIp(minIp))
    const lastAddress = this.expand(this.convertBinaryToIp(maxIp))
    return {
      network: networkId.join(':'), // ipv6 没有网络 id 的概念
      firstAddress,
      lastAddress: lastAddress,
      broadcastAddress: lastAddress,
      available: Math.pow(2, 128 - cidrMask)
    }
  }
}