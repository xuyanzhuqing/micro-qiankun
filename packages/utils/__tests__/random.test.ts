import Random from '../src/random';
import { describe, expect, test, beforeEach } from '@jest/globals';

describe("Random it test", () => {
  test("Random isValidV4 test", () => {
    const random = new Random()
    expect(/^[0-9a-z]+$/.test(random.make())).toBe(true);
    expect(/^[0-9a-z]{6,6}$/.test(random.make())).toBe(true);
  });
});

