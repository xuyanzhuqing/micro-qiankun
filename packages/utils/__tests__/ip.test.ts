// https://iiis.tsinghua.edu.cn/ip/
// https://jennieji.github.io/subipv6/
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
    expect(ipV6Handler.not('::')).toEqual(new Array(128).fill(1))
    expect(ipV6Handler.not('ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff')).toEqual(new Array(128).fill(0))
    expect(ipV6Handler.not('ffff:ffff:ffff:ffff::')).toEqual(new Array(64).fill(0).concat(new Array(64).fill(1)))
    expect(ipV6Handler.not('::ffff:ffff:ffff:ffff')).toEqual(new Array(64).fill(1).concat(new Array(64).fill(0)))
  })

  test('is ip or success', () => {
    expect(ipV4Handler.or('255.255.255.255', '0.0.0.0')).toEqual(new Array(32).fill(1))
    expect(ipV4Handler.or('255.255.255.255', '255.255.255.255')).toEqual(new Array(32).fill(1))
    expect(ipV4Handler.or('0.0.0.0', '0.0.0.1')).toEqual(new Array(31).fill(0).concat(1))
    expect(ipV4Handler.or('192.168.1.1', '0.0.0.0')).toEqual([1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1])
    expect(ipV6Handler.or('::', 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff')).toEqual(new Array(128).fill(1))
    expect(ipV6Handler.or('::ffff:ffff:ffff:ffff', 'ffff:ffff:ffff:ffff::')).toEqual(new Array(128).fill(1))
  })

  test('is ip and success', () => {
    expect(ipV4Handler.and('255.255.255.255', '0.0.0.0')).toEqual(new Array(32).fill(0))
    expect(ipV4Handler.and('255.255.255.255', '255.255.255.255')).toEqual(new Array(32).fill(1))
    expect(ipV4Handler.and('0.0.0.0', '0.0.0.1')).toEqual(new Array(32).fill(0))
    expect(ipV4Handler.and('192.168.1.1', '0.0.1.0')).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0])
    expect(ipV6Handler.and('::', 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff')).toEqual(new Array(128).fill(0))
    expect(ipV6Handler.and('ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff', '::')).toEqual(new Array(128).fill(0))
    expect(ipV6Handler.and('::ffff:ffff:ffff:ffff', 'ffff:ffff:ffff:ffff::')).toEqual(new Array(128).fill(0))
  })

  test('is ip isSameNetwork success', () => {
    expect(ipV4Handler.isSameNetwork('192.168.10.1', '192.168.10.254', Mask.maskMap.get(24)?.v4 as string)).toBe(true)
    expect(ipV4Handler.isSameNetwork('192.168.10.1', '192.168.11.154', Mask.maskMap.get(23)?.v4 as string)).toBe(true)
    expect(ipV6Handler.isSameNetwork('FFFF:FFFF:FFE0:0000:0000:0000:0000:0000', 'FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF', Mask.maskMap.get(43)?.v6 as string)).toBe(true)
  })

  test('is ip contains success', () => {
    expect(ipV4Handler.contains('192.168.10.2', '255.255.255.255')('192.168.10.5')).toEqual(false)
    expect(ipV4Handler.contains('192.168.10.2', '255.255.255.254')('192.168.10.4')).toEqual(false)
    expect(ipV4Handler.contains('192.168.10.2', '255.255.255.254')('192.168.10.3')).toEqual(true)
    expect(ipV4Handler.contains('192.168.62.254', '255.255.192.0')('192.168.62.254')).toEqual(true)
    expect(ipV4Handler.contains('192.168.62.254', '255.255.192.0')('192.168.63.1')).toEqual(true)
    expect(ipV4Handler.contains('192.168.62.254', '255.255.192.0')('192.168.63.2')).toEqual(true)
    expect(ipV4Handler.contains('192.168.62.254', '255.255.192.0')('192.168.63.3')).toEqual(true)
    expect(ipV6Handler.contains('0000:0000:0000:0000:000a:0001:0002:0004', 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ff00')('::000A:0001:0002:0000')).toEqual(true)
  })

  //-----------------------------ip 公共方法结束----------------------------------

  test('is ip convertIPtoBinary success', () => {
    expect(ipV4Handler.convertIPtoBinary('255.255.255.255')).toEqual(new Array(32).fill(1))
    expect(ipV4Handler.convertIPtoBinary('0.0.0.0')).toEqual(new Array(32).fill(0))
    expect(ipV4Handler.convertIPtoBinary('192.168.1.1').join('')).toEqual('11000000101010000000000100000001')
  })

  test('is ip convertBinaryToIp success', () => {
    expect(ipV4Handler.convertBinaryToIp(new Array(32).fill(1))).toEqual('255.255.255.255')
    expect(ipV4Handler.convertBinaryToIp(new Array(32).fill(0))).toEqual('0.0.0.0')
    expect(ipV4Handler.convertBinaryToIp([1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1])).toEqual('192.168.1.1')
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
  //-----------------------------ipv6 开始----------------------------------

  test('is ipv6 expand success', () => {
    ipv6s.forEach((abbr, full) => {
      expect(ipV6Handler.expand(abbr)).toEqual(full)
    })
  })

  test('is ipv6 compress success', () => {
    ipv6s.forEach((abbr, full) => {
      expect(ipV6Handler.compress(full)).toEqual(abbr)
    })
    // 模仿用户输入
    expect(ipV6Handler.compress('::0000:1')).toEqual('::1')
  })

  test('is ipv6 convertIPtoBinary success', () => {
    expect(ipV6Handler.convertIPtoBinary('FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF')).toEqual(new Array(128).fill(1))
    expect(ipV6Handler.convertIPtoBinary('::')).toEqual(new Array(128).fill(0))
    expect(ipV6Handler.convertIPtoBinary('::1')).toEqual(new Array(127).fill(0).concat(1))
  })

  test('is ip convertBinaryToIp success', () => {
    expect(ipV6Handler.convertBinaryToIp(new Array(128).fill(1))).toEqual('FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF'.toLocaleLowerCase())
    expect(ipV6Handler.convertBinaryToIp(new Array(128).fill(0))).toEqual('0:0:0:0:0:0:0:0')
  })

  test('is ipv6 ipToLong success', () => {
    // 取消科学计数
    // .toLocaleString('fullwide', { useGrouping: false })
    expect(ipV6Handler.ipToLong('FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF') === 340282366920938463463374607431768211455n).toBeTruthy()
    expect(ipV6Handler.ipToLong('1::') === 5192296858534827628530496329220096n).toBeTruthy()
    expect(ipV6Handler.ipToLong('::1') === 1n).toBeTruthy()
    expect(ipV6Handler.ipToLong('fe80:0000:0000:7aca:39ff:0000:0000:e67d') === 338288524927261669513151168806616360573n).toBeTruthy()
  })

  test('is ipv6 longToIp success', () => {
    expect(ipV6Handler.longToIP(340282366920938463463374607431768211455n)).toEqual('ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff')
    expect(ipV6Handler.longToIP(5192296858534827628530496329220095n)).toEqual('0:ffff:ffff:ffff:ffff:ffff:ffff:ffff')
    expect(ipV6Handler.longToIP(1n)).toEqual('0:0:0:0:0:0:0:1')
    expect(ipV6Handler.longToIP(5192296858534827628530496329220096n)).toEqual('1:0:0:0:0:0:0:0')
    expect(ipV6Handler.longToIP(338288524927261669513151168806616360573n)).toEqual('fe80:0:0:7aca:39ff:0:0:e67d')
  })

  test('is subnet success', () => {
    expect(ipV6Handler.subnet('FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF', 'ffff:ffff:ffff:ffff::')).toEqual({
      available: 18446744073709552000,
      network: 'ffff:ffff:ffff:ffff:0:0:0:0',
      firstAddress: 'ffff:ffff:ffff:ffff:0000:0000:0000:0000',
      lastAddress: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
      broadcastAddress: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff'
    })
    expect(ipV6Handler.subnet('0000:0000:0000:0000:000a:0001:0002:0003', 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ff00')).toEqual({
      available: 256,
      network: '0:0:0:0:a:1:2:0',
      firstAddress: '0000:0000:0000:0000:000a:0001:0002:0000',
      lastAddress: '0000:0000:0000:0000:000a:0001:0002:00ff',
      broadcastAddress: '0000:0000:0000:0000:000a:0001:0002:00ff'
    })
  })

  test('is calculateAddresses success', () => {
    expect(ipV6Handler.calculateAddresses('fe80:0000:0000:7aca:39ff:0000:0000:e67d', 1)).toEqual(['fe80:0:0:7aca:39ff:0:0:e67d'])
    expect(ipV6Handler.calculateAddresses('FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:0', 2)).toEqual(['ffff:ffff:ffff:ffff:ffff:ffff:ffff:0', 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:1'])
  })

  test('is calculateAddressRange success', () => {
    expect(ipV6Handler.calculateAddressRange(
      'fe80:0000:0000:7aca:39ff:0000:0000:e67d', 'fe80:0000:0000:7aca:39ff:0000:0000:e68d')).toEqual(
        [
          'fe80:0:0:7aca:39ff:0:0:e67d',
          'fe80:0:0:7aca:39ff:0:0:e67e',
          'fe80:0:0:7aca:39ff:0:0:e67f',
          'fe80:0:0:7aca:39ff:0:0:e680',
          'fe80:0:0:7aca:39ff:0:0:e681',
          'fe80:0:0:7aca:39ff:0:0:e682',
          'fe80:0:0:7aca:39ff:0:0:e683',
          'fe80:0:0:7aca:39ff:0:0:e684',
          'fe80:0:0:7aca:39ff:0:0:e685',
          'fe80:0:0:7aca:39ff:0:0:e686',
          'fe80:0:0:7aca:39ff:0:0:e687',
          'fe80:0:0:7aca:39ff:0:0:e688',
          'fe80:0:0:7aca:39ff:0:0:e689',
          'fe80:0:0:7aca:39ff:0:0:e68a',
          'fe80:0:0:7aca:39ff:0:0:e68b',
          'fe80:0:0:7aca:39ff:0:0:e68c',
          'fe80:0:0:7aca:39ff:0:0:e68d',
        ]
      )

    expect(ipV6Handler.calculateAddressRange('0000:0000:0000:0000:000A:0001:0002:0000', '0000:0000:0000:0000:000A:0001:0002:00FF').length).toBe(256)
    expect(ipV6Handler.calculateAddressRange(
      '::ffff:fffa', '::1:0000:0000')).toEqual(
        [
          '0:0:0:0:0:0:ffff:fffa',
          '0:0:0:0:0:0:ffff:fffb',
          '0:0:0:0:0:0:ffff:fffc',
          '0:0:0:0:0:0:ffff:fffd',
          '0:0:0:0:0:0:ffff:fffe',
          '0:0:0:0:0:0:ffff:ffff',
          '0:0:0:0:0:1:0:0',
        ]
      )
  })
});

