import { describe, expect, it, beforeEach, afterEach } from '@jest/globals';
import { requestInterceptors } from '../src/index'
import { setAuthorization, AUTH_HEADER_KEY } from '@dnt/utils/lib';
import { InternalAxiosRequestConfig } from 'axios';

describe("test axios plugin settings", () => {
  // let mock: MockAdapter;

  const mockJson = { data: "json data" };
  beforeEach(() => {
    localStorage.clear();
    setAuthorization(JSON.stringify(mockJson));

    // mock = new MockAdapter(createAxios, { delayResponse: 2000 });
  });

  afterEach(() => {
    // mock.reset();
  })

  it('should merged auth info', async () => {
    const config = {
      headers: {}
    } as InternalAxiosRequestConfig
    requestInterceptors[0](config)

    expect(config.headers[AUTH_HEADER_KEY]).toEqual('Bearer ' + JSON.stringify(mockJson));
  })
})