import mask, { Mask } from '../src/mask';
import { describe, expect, test, beforeEach } from '@jest/globals';

describe("Mask it test", () => {
  test("Mask isValidV4 test", () => {
    expect(Mask.isValidV4(1)).toBe(true);
    expect(Mask.isValidV4(24)).toBe(true);
    expect(Mask.isValidV4(32)).toBe(true);

    expect(Mask.isValidV4('128.0.0.0')).toBe(true);
    expect(Mask.isValidV4('255.255.255.0')).toBe(true);
    expect(Mask.isValidV4('255.255.255.255')).toBe(true);

    expect(Mask.isValidV4('128.0.00.000')).toBe(true);
    expect(Mask.isValidV4('255.255.255.00')).toBe(true);
  });

  test("Mask getV4Mask test", () => {
    expect(mask.getV4Mask(1)).toBe('128.0.0.0');
    expect(mask.getV4Mask(24)).toBe('255.255.255.0');
    expect(mask.getV4Mask(32)).toBe('255.255.255.255');

    expect(mask.getV4Mask('128.0.0.0')).toBe(1);
    expect(mask.getV4Mask('255.255.255.0')).toBe(24);
    expect(mask.getV4Mask('255.255.255.255')).toBe(32);

    expect(mask.getV4Mask('128.0.00.000')).toBe(1);
    expect(mask.getV4Mask('255.255.255.00')).toBe(24);
  });

  test("Mask isValidV6 test", () => {
    expect(Mask.isValidV6(1)).toBe(true);
    expect(Mask.isValidV6(64)).toBe(true);
    expect(Mask.isValidV6(128)).toBe(true);

    expect(Mask.isValidV6('8000::')).toBe(true);
    expect(Mask.isValidV6('ffff:ffff:ffff:ffff::')).toBe(true);
    expect(Mask.isValidV6('ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff')).toBe(true);

    expect(Mask.isValidV6('8000:0000:0:0:0:0:0:0')).toBe(true);
    expect(Mask.isValidV6('ffff:ffff:ffff:ffff:ffff:ffff:ffff:FFFF')).toBe(true);
  });

  test("Mask getV4Mask test", () => {
    expect(mask.getV6Mask(1)).toBe('8000::');
    expect(mask.getV6Mask(64)).toBe('ffff:ffff:ffff:ffff::');
    expect(mask.getV6Mask(128)).toBe('ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff');

    expect(mask.getV6Mask('8000::')).toBe(1);
    expect(mask.getV6Mask('ffff:ffff:ffff:ffff::')).toBe(64);
    expect(mask.getV6Mask('ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff')).toBe(128);

    expect(mask.getV6Mask('8000:0000:0:0:0:0:0:0')).toBe(1);
    expect(mask.getV6Mask('ffff:ffff:ffff:ffff:ffff:ffff:ffff:FFFF')).toBe(128);
  });
});

