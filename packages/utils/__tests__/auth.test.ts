import { getAuthorization, setAuthorization } from '../src/auth';
import { describe, expect, it, test, beforeEach, jest } from '@jest/globals';

describe("Set local storage item", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("data is added into local storage", () => {
    const mockJson = { data: "json data" };
    setAuthorization(JSON.stringify(mockJson));
    expect(getAuthorization()).toEqual(JSON.stringify(mockJson));
  });
});

