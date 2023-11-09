// https://iiis.tsinghua.edu.cn/ip/ 测试网站
import { IpAbstract, Subnet, ipV4Handler, ipV6Handler, isIpFormat, isV4Format, isV6Format } from '../src/ip';
import { describe, expect, test, beforeEach } from '@jest/globals';
import { Mask } from '../src/mask'

const ipv4s: Map<string, string> = new Map([
  ['001.001.001.001', '1.1.1.1'],
  ['000.000.000.000', '0.0.0.0'],
  ['255.255.255.255', '255.255.255.255'],
  ['192.168.000.001', '192.168.0.1']
])

const ipv6s: Map<string, string> = new Map([
  ['ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff', 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff'],
  ['FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF', 'FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF'],
  ['fe80:1244:1244:1244:7aca:39ff:feb0:fffe', 'fe80:1244:1244:1244:7aca:39ff:feb0:fffe'],
  ['fe80:0000:0000:0000:7aca:39ff:feb0:fffe', 'fe80::7aca:39ff:feb0:fffe'],
  ['fe80:0000:0000:0000:7aca:39ff:feb0:e67d', 'fe80:0:0:0:7aca:39ff:feb0:e67d',],
  ['fe80:0000:0012:0001:7aca:39ff:feb0:e67d', 'fe80:0:12:1:7aca:39ff:feb0:e67d',],
  ['fe80:0000:0012:0001:0000:0000:feb0:e67d', 'fe80:0:12:1::feb0:e67d',],
  ['fe80:0000:0000:0000:7aca:39ff:feb0:e67d', 'fe80::7aca:39ff:feb0:e67d',],
  ['fe80:0000:0000:7aca:39ff:0000:0000:e67d', 'fe80:0:0:7aca:39ff::e67d',],
  ['fe80:0000:0233:7aca:39ff:0000:0000:e67d', 'fe80:0:233:7aca:39ff::e67d',],
  ['fe80:0000:0000:7aca:39ff:0000:0000:e67d', 'fe80::7aca:39ff:0:0:e67d',],
  ['0000:0000:0000:0000:0000:0000:0000:0000', '::',],
  ['0000:0000:0000:0000:0000:0000:0000:0001', '::1',],
  ['0001:0000:0000:0000:0000:0000:0000:0000', '1::',],
])

const mixes: Map<string, string> = new Map([
  ['::192.168.1.1', '::192.168.1.1']
])

const ips: string[] = [
  ...ipv4s.keys(),
  ...ipv4s.values(),
  ...ipv6s.keys(),
  ...ipv6s.values(),
  ...mixes.keys(),
  ...mixes.values(),
]

describe("Ip it test", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  //-----------------------------ip 公共方法开始----------------------------------

  test("is ip format", () => {
    ips.forEach(ip => {
      expect(isIpFormat(ip)).toEqual(true);
    })
  });

  test('is ipv4 format', () => {
    [...ipv4s.keys(), ...ipv4s.values()].forEach(ip => {
      expect(isV4Format(ip)).toEqual(true);
    })
  })
  test('is ipv6 format', () => {
    [...ipv6s.keys(), ...ipv6s.values()].forEach(ip => {
      expect(isV6Format(ip)).toEqual(true);
    })
  })

  test('is ip toFixedZero success', () => {
    expect(ipV4Handler.toFixedZero('1', 3)).toEqual('001')
    expect(ipV4Handler.toFixedZero('255', 3)).toEqual('255')
    expect(ipV4Handler.toFixedZero('10', 3)).toEqual('010')

    expect(ipV6Handler.toFixedZero('1', 4)).toEqual('0001')
    expect(ipV6Handler.toFixedZero('12a', 4)).toEqual('012a')
    expect(ipV6Handler.toFixedZero('255b', 4)).toEqual('255b')
  })

  test('is ip toDropZero success', () => {
    expect(ipV4Handler.toDropZero('001')).toEqual('1')
    expect(ipV4Handler.toDropZero('255')).toEqual('255')
    expect(ipV4Handler.toDropZero('010')).toEqual('10')

    expect(ipV6Handler.toDropZero('0001')).toEqual('1')
    expect(ipV6Handler.toDropZero('012a')).toEqual('12a')
    expect(ipV6Handler.toDropZero('255b')).toEqual('255b')
  })

  test('is ip not success', () => {
    expect(ipV4Handler.not('255.255.255.255')).toEqual(new Array(32).fill(0))
    expect(ipV4Handler.not('192.168.1.1')).toEqual([0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0])
    expect(ipV4Handler.not('0.0.0.0')).toEqual(new Array(32).fill(1))
    // TODO: ipv6
  })

  test('is ip or success', () => {
    expect(ipV4Handler.or('255.255.255.255', '0.0.0.0')).toEqual(new Array(32).fill(1))
    expect(ipV4Handler.or('255.255.255.255', '255.255.255.255')).toEqual(new Array(32).fill(1))
    expect(ipV4Handler.or('0.0.0.0', '0.0.0.1')).toEqual(new Array(31).fill(0).concat(1))
    expect(ipV4Handler.or('192.168.1.1', '0.0.0.0')).toEqual([1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1])
    // TODO: ipv6
  })

  test('is ip and success', () => {
    expect(ipV4Handler.and('255.255.255.255', '0.0.0.0')).toEqual(new Array(32).fill(0))
    expect(ipV4Handler.and('255.255.255.255', '255.255.255.255')).toEqual(new Array(32).fill(1))
    expect(ipV4Handler.and('0.0.0.0', '0.0.0.1')).toEqual(new Array(32).fill(0))
    expect(ipV4Handler.and('192.168.1.1', '0.0.1.0')).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0])
    // TODO: ipv6
  })

  test('is ip isSameNetwork success', () => {
    expect(ipV4Handler.isSameNetwork('192.168.10.1', '192.168.10.254', Mask.maskMap.get(24)?.v4 as string)).toBe(true)
    expect(ipV4Handler.isSameNetwork('192.168.10.1', '192.168.11.154', Mask.maskMap.get(23)?.v4 as string)).toBe(true)
    // TODO: ipv6
  })

  //-----------------------------ip 公共方法结束----------------------------------

  test('is ip convertIPtoBinary success', () => {
    expect(ipV4Handler.convertIPtoBinary('255.255.255.255')).toEqual(new Array(32).fill(1))
    expect(ipV4Handler.convertIPtoBinary('0.0.0.0')).toEqual(new Array(32).fill(0))
    expect(ipV4Handler.convertIPtoBinary('192.168.1.1').join('')).toEqual('11000000101010000000000100000001')
  })

  test('is ip convertIPtoBinary success', () => {
    expect(ipV4Handler.convertIPtoBinary('255.255.255.255')).toEqual(new Array(32).fill(1))
    expect(ipV4Handler.convertIPtoBinary('0.0.0.0')).toEqual(new Array(32).fill(0))
    expect(ipV4Handler.convertIPtoBinary('192.168.1.1').join('')).toEqual('11000000101010000000000100000001')
  })

  test('is ip ipToLong success', () => {
    expect(ipV4Handler.ipToLong('255.255.255.255')).toEqual(4294967295)
    expect(ipV4Handler.ipToLong('1.1.1.1')).toEqual(16843009)
    expect(ipV4Handler.ipToLong('192.168.0.1')).toEqual(3232235521)
    expect(ipV4Handler.ipToLong('0.0.0.0')).toEqual(0)
  })

  test('is ip longToIp success', () => {
    expect(ipV4Handler.longToIP(4294967295)).toEqual('255.255.255.255')
    expect(ipV4Handler.longToIP(16843009)).toEqual('1.1.1.1')
    expect(ipV4Handler.longToIP(3232235521)).toEqual('192.168.0.1')
    expect(ipV4Handler.longToIP(0)).toEqual('0.0.0.0')
  })

  test('is ipv4 expand success', () => {
    ipv4s.forEach((abbr, full) => {
      expect(ipV4Handler.expand(abbr)).toEqual(full)
    })
  })

  test('is ipv4 compress success', () => {
    ipv4s.forEach((abbr, full) => {
      expect(ipV4Handler.compress(full)).toEqual(abbr)
    })
  })
  test('is ipv4 subnet success', () => {
    expect(ipV4Handler.subnet('192.168.10.2', '255.255.255.255')).toEqual({
      available: 1,
      network: '192.168.10.2',
      firstAddress: '192.168.10.2',
      lastAddress: '192.168.10.2',
      broadcastAddress: '192.168.10.2',
    } as Subnet)
    expect(ipV4Handler.subnet('192.168.10.2', '255.255.255.254')).toEqual({
      available: 2,
      network: '192.168.10.2',
      firstAddress: '192.168.10.2',
      lastAddress: '192.168.10.3',
      broadcastAddress: '192.168.10.3',
    } as Subnet)
    expect(ipV4Handler.subnet('192.168.10.2', '255.255.255.0')).toEqual({
      available: 254,
      network: '192.168.10.0',
      firstAddress: '192.168.10.1',
      lastAddress: '192.168.10.254',
      broadcastAddress: '192.168.10.255',
    })
    expect(ipV4Handler.subnet('192.168.10.2', '255.255.192.0')).toEqual({
      available: 16382,
      network: '192.168.0.0',
      firstAddress: '192.168.0.1',
      lastAddress: '192.168.63.254',
      broadcastAddress: '192.168.63.255',
    })
  })

  test('is ipv4 calculateAddresses success', () => {
    expect(ipV4Handler.calculateAddresses('192.168.10.2', 2, '255.255.255.255')).toEqual(['192.168.10.2'])
    expect(ipV4Handler.calculateAddresses('192.168.10.2', 2, '255.255.255.254')).toEqual(['192.168.10.2', '192.168.10.3'])
    expect(ipV4Handler.calculateAddresses('192.168.62.254', 5, '255.255.192.0')).toEqual([
      '192.168.62.254', '192.168.62.255', '192.168.63.0', '192.168.63.1', '192.168.63.2'
    ])
  })

  test('is ipv4 calculateAddressRange success', () => {
    expect(ipV4Handler.calculateAddressRange('192.168.10.2', '192.168.10.5', '255.255.255.255')).toEqual(['192.168.10.2'])
    expect(ipV4Handler.calculateAddressRange('192.168.10.2', '192.168.10.4', '255.255.255.254')).toEqual(['192.168.10.2', '192.168.10.3'])
    expect(ipV4Handler.calculateAddressRange('192.168.62.254', '192.168.63.2', '255.255.192.0')).toEqual([
      '192.168.62.254', '192.168.62.255', '192.168.63.0', '192.168.63.1', '192.168.63.2'
    ])
  })

  test('is ipv4 contains success', () => {
    expect(ipV4Handler.contains('192.168.10.2', '255.255.255.255')('192.168.10.5')).toEqual(false)
    expect(ipV4Handler.contains('192.168.10.2', '255.255.255.254')('192.168.10.4')).toEqual(false)
    expect(ipV4Handler.contains('192.168.10.2', '255.255.255.254')('192.168.10.3')).toEqual(true)
    expect(ipV4Handler.contains('192.168.62.254', '255.255.192.0')('192.168.62.254')).toEqual(true)
    expect(ipV4Handler.contains('192.168.62.254', '255.255.192.0')('192.168.63.1')).toEqual(true)
    expect(ipV4Handler.contains('192.168.62.254', '255.255.192.0')('192.168.63.2')).toEqual(true)
    expect(ipV4Handler.contains('192.168.62.254', '255.255.192.0')('192.168.63.3')).toEqual(true)
  })
});

