
import { Bite, IpAbstract, Subnet } from './common'
import maskUtil from '../mask'
import { isV4Format } from './regex';

export class IpV4Handler extends IpAbstract {
  ipToLong(ip: string): number {
    const parts = ip.split('.');
    let decimal = 0
    for (let i = 0; i < 4; i++) {
      decimal += parseInt(parts[i], 10) * Math.pow(256, 4 - i - 1)
    }
    return decimal;
  }
  longToIP(ip: number): string {
    const binaryString = ip.toString(2).padStart(32, "0");
    const octets = binaryString
      .match(/.{1,8}/g)
      ?.map((binaryOctet) => parseInt(binaryOctet, 2));
    return octets ? octets.join(".") : ''
  }
  expand(ip: string): string {
    const fragments = ip.split('.')
    const res: string[] = new Array(4)
    const toFixedZero = this.toFixedZero

    fragments.forEach((frag, index) => {
      const bites = frag.split('.').map(v => toFixedZero(v, 3))
      res[index] = bites.join('')
    })
    return res.join('.')
  }
  compress(ip: string): string {
    const fragments = ip.split('.')
    const toDropZero = this.toDropZero
    fragments.forEach((frag, index) => {
      fragments[index] = toDropZero(frag)
    })
    return fragments.join('.')
  }
  convertBinaryToIp(bites: Bite[]): string {
    const res = new Array(4)
    let oct
    for (let i = 0; i < 4; i++) {
      oct = bites.slice(i * 8, (1 + i) * 8).join('')
      res[i] = parseInt(oct, 2)
    }
    return res.join('.')
  }
  convertIPtoBinary(ip: string): Array<Bite> {
    const cache = this.convertCache.get(ip)
    if (cache) {
      return [...cache]
    }

    const octets = ip.split('.')
    const binaryOctets = octets.map((octet) => {
      return parseInt(octet, 10)
        .toString(2)
        .padStart(8, "0")
        .split('')
        .map(v => parseInt(v, 10) ? 1 : 0)
    })

    const res = binaryOctets.flat()
    this.convertCache.set(ip, res)
    return res
  }


  subnet(ip: string, mask: string | number): Subnet {
    const cidrMask = typeof mask === 'number' ? mask : maskUtil.getV4Mask(mask)
    const maskString = typeof mask === 'number' ? maskUtil.getV4Mask(mask) : mask
    if (maskString === undefined || cidrMask === undefined) {
      throw new Error(`invalid mask: ${mask}`)
    }

    const ipFrags = ip.split('.').map(v => parseInt(v, 10))
    const maskFrags = maskString.split('.').map(v => parseInt(v, 10))

    if (cidrMask == 31) {
      const firstAddress = ipFrags.map((ip, i) => ip & maskFrags[i]).join('.')
      const lastAddress = ipFrags.map((ip, i) => ip | (~maskFrags[i] & 0xff)).join('.')
      return {
        network: ip,
        firstAddress,
        lastAddress,
        broadcastAddress: lastAddress,
        available: 2
      }
    }

    if (cidrMask === 32) {
      return {
        network: ip,
        firstAddress: ip,
        lastAddress: ip,
        broadcastAddress: ip,
        available: 1
      }
    }

    const networkFrags = ipFrags.map((ip, i) => ip & maskFrags[i])
    const broadcastAddressFrags = ipFrags.map((ip, i) => ip | (~maskFrags[i] & 0xff))
    const firstAddressTail = networkFrags[networkFrags.length - 1] + 1
    const lastAddressTail = broadcastAddressFrags[broadcastAddressFrags.length - 1] - 1
    return {
      network: networkFrags.join('.'),
      firstAddress: networkFrags.slice(0, 3).concat(firstAddressTail).join('.'),
      lastAddress: broadcastAddressFrags.slice(0, 3).concat(lastAddressTail).join('.'),
      broadcastAddress: broadcastAddressFrags.join('.'),
      available: Math.pow(2, 32 - cidrMask) - 2
    }
  }

  calculateAddresses(ip: string, count: number, mask?: string | number): string[] {
    let strMask: string | undefined
    if (typeof mask === 'number') {
      strMask = maskUtil.getV4Mask(mask)
    } else if (typeof mask === 'string') {
      if (!isV4Format(mask)) {
        throw new Error(`Invalid mask: ${mask}`)
      }
      strMask = mask
    }

    let firstLongAddress = this.ipToLong(ip)
    const res: string[] = []

    const canLoop = [
      (i: number) => i < count
    ]

    // 考虑同网段的情况
    if (strMask !== undefined) {
      const subnet = this.subnet(ip, strMask)
      canLoop.push(
        (i: number) => i < subnet.available
      )
    }
    let i = 0;
    while (canLoop.reduce((acc, curr) => acc && curr(i), true)) {
      res.push(this.longToIP(firstLongAddress++))
      // 防止溢出
      if (res[i] === '255.255.255.255') {
        break
      }
      i++
    }
    return res
  }

  calculateAddressRange(startIp: string, endIp: string, mask?: string | number): string[] {
    let strMask: string | undefined
    if (typeof mask === 'number') {
      strMask = maskUtil.getV4Mask(mask)
    } else if (typeof mask === 'string') {
      if (!isV4Format(mask)) {
        throw new Error(`Invalid mask: ${mask}`)
      }
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
}