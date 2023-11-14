import VersionParser, { Version } from '../src/version-parser';
import { describe, expect, test, beforeEach } from '@jest/globals';

describe("VersionParser it test", () => {
  test("VersionParser isValidV4 test", () => {
    expect(VersionParser.isValid('1.1.1-1')).toBe(true);
  });

  test("VersionParser parse test", () => {
    expect(VersionParser.parse('1.1.1-1')).toEqual({
      origin: '1.1.1-1',
      major: 1,
      minor: 1,
      patch: 1,
      prerelease: 1,
    } as Version);
    expect(VersionParser.parse('10.10.11-11')).toEqual({
      origin: '10.10.11-11',
      major: 10,
      minor: 10,
      patch: 11,
      prerelease: 11,
    } as Version);
  });

  test("VersionParser compare test", () => {
    expect(VersionParser.compare('1.1.1-1', '10.10.11-11')).toEqual(-1);
    expect(VersionParser.compare('10.10.11-11', '1.1.1-1',)).toEqual(1);

    const versionParser = new VersionParser('1.1.1')
    expect(versionParser.compareTo('1.1.1')).toEqual(0);
    expect(versionParser.compareTo('0.1')).toEqual(1);
    expect(versionParser.compareTo('1.2')).toEqual(-1);
  });

  test("versionParser compareTo test", () => {
    const versionParser = new VersionParser('1.1.1')
    expect(versionParser.compareTo('1.1.1')).toEqual(0);
    expect(versionParser.compareTo('0.1')).toEqual(1);
    expect(versionParser.compareTo('1.2')).toEqual(-1);
  });
});

