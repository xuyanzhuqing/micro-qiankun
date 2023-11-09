import { Bite, IpAbstract, Subnet } from "./common"

export class IpV6Handler extends IpAbstract {
  calculateAddresses(ip: string, count: number, mask: string): string[];
  calculateAddresses(ip: string, count: number, mask: number): string[];
  calculateAddresses(cidr: string, count: number): string[];
  calculateAddresses(ip: unknown, count: unknown, mask?: unknown): string[] {
    throw new Error("Method not implemented.");
  }
  calculateAddressRange(startIp: string, endIp: string, mask?: string | number | undefined): string[] {
    throw new Error("Method not implemented.");
  }
  contains(network: string, mask: string): (ip: string) => boolean {
    throw new Error("Method not implemented.");
  }
  compare(ip1: string, ip2: string): 0 | 1 | -1 {
    throw new Error("Method not implemented.");
  }
  convertIPtoBinary(ip: string): Bite[] {
    throw new Error("Method not implemented.");
  }
  expand(ip: string): string {
    throw new Error("Method not implemented.");
  }
  compress(ip: string): string {
    throw new Error("Method not implemented.");
  }
  ipToLong(ip: string): number {
    throw new Error("Method not implemented.");
  }
  longToIP(ip: number): string {
    throw new Error("Method not implemented.");
  }
  subnet(ip: string, mask: string): Subnet {
    throw new Error("Method not implemented.");
  }
}