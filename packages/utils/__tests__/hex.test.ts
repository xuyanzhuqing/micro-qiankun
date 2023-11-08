import Hex from '../src/hex';
import { describe, expect, test, beforeEach } from '@jest/globals';

describe("Hex it test", () => {
  test("getChar is done", () => {
    expect(Hex.getChar(0)).toEqual('0');
    expect(Hex.getChar(9)).toEqual('9');
    expect(Hex.getChar(15)).toEqual('f');
  });

  test("getInt is done", () => {
    expect(Hex.getInt('0')).toBe(0);
    expect(Hex.getInt('9')).toBe(9);
    expect(Hex.getInt('f')).toBe(15);
  });

  test("getBitesByChar is done", () => {
    const cache = Hex.getBitesByChar()
    expect(cache('0')).toEqual([0, 0, 0, 0])
    expect(cache('1')).toEqual([0, 0, 0, 1])
    expect(cache('2')).toEqual([0, 0, 1, 0])
    expect(cache('9')).toEqual([1, 0, 0, 1])
    expect(cache('a')).toEqual([1, 0, 1, 0])
    expect(cache('f')).toEqual([1, 1, 1, 1])
  });

  test("getBitesByInt is done", () => {
    const cache = Hex.getBitesByInt()
    expect(cache(0)).toEqual([0, 0, 0, 0])
    expect(cache(1)).toEqual([0, 0, 0, 1])
    expect(cache(2)).toEqual([0, 0, 1, 0])
    expect(cache(9)).toEqual([1, 0, 0, 1])
    expect(cache(10)).toEqual([1, 0, 1, 0])
    expect(cache(15)).toEqual([1, 1, 1, 1])
  });
});

