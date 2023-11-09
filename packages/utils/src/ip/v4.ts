
import maskInstance from '../mask';
import { Bite, IpAbstract, Subnet } from './common'
import maskUtil from '../mask'

export class IpV4Handler extends IpAbstract {
  ipToLong(ip: string): number {
    const parts = ip.split('.');
    const decimal =
      parseInt(parts[0]) * Math.pow(256, 3) +
      parseInt(parts[1]) * Math.pow(256, 2) +
      parseInt(parts[2]) * Math.pow(256, 1) +
      parseInt(parts[3]);
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
  convertIPtoBinary(ip: string): Array<Bite> {
    const cache = this.convertCache.get(ip)
    if (cache) {
      return [...cache]
    }

    const octets = ip.split('.')
    const binaryOctets = octets.map((octet) => {
      return parseInt(octet)
        .toString(2)
        .padStart(8, "0")
        .split('')
        .map(v => parseInt(v, 10) ? 1 : 0)
    })

    const res = binaryOctets.flat()
    this.convertCache.set(ip, res)
    return res
  }

  compare(ip1: string, ip2: string): 0 | 1 | -1 {
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

  subnet(ip: string, mask: string): Subnet {
    const cidrMask = maskInstance.getV4Mask(mask)
    if (cidrMask === undefined) {
      throw new Error(`invalid CIDR subnet: ${mask}`)
    }

    const ipFrags = ip.split('.').map(v => parseInt(v, 10))
    const maskFrags = mask.split('.').map(v => parseInt(v, 10))

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
    } else {
      strMask = mask
    }

    let firstLongAddress = this.ipToLong(ip)
    const res: string[] = []

    // 不考虑同网段的情况
    if (strMask === undefined) {
      for (let i = 0; i < count; i++) {
        res.push(this.longToIP(firstLongAddress++))
      }
      return res
    }

    const subnet = this.subnet(ip, strMask)
    for (let i = 0; i < count && i < subnet.available; i++) {
      res.push(this.longToIP(firstLongAddress++))
    }
    return res
  }

  calculateAddressRange(startIp: string, endIp: string, mask?: string | number): string[] {
    let strMask: string | undefined
    if (typeof mask === 'number') {
      strMask = maskUtil.getV4Mask(mask)
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
  contains(network: string, mask: string): (ip: string) => boolean {
    const subInfo = this.subnet(network, mask)
    const min = this.ipToLong(subInfo.firstAddress)
    const max = this.ipToLong(subInfo.lastAddress)
    return ip => {
      const n = this.ipToLong(ip)
      return min <= n && n <= max
    }
  }
}