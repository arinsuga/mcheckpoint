import { getApiImageSource } from '../ApiImageSource';

const originalApiUrl = process.env.EXPO_PUBLIC_API_URL;
const originalApiDebugHost = process.env.EXPO_PUBLIC_API_DEBUGHOST;

afterEach(() => {
  if (originalApiUrl === undefined) {
    delete process.env.EXPO_PUBLIC_API_URL;
  } else {
    process.env.EXPO_PUBLIC_API_URL = originalApiUrl;
  }

  if (originalApiDebugHost === undefined) {
    delete process.env.EXPO_PUBLIC_API_DEBUGHOST;
  } else {
    process.env.EXPO_PUBLIC_API_DEBUGHOST = originalApiDebugHost;
  }
});

describe('getApiImageSource', () => {
  it('routes local development image requests through the USB API URL', () => {
    process.env.EXPO_PUBLIC_API_URL = 'http://127.0.0.1:18080/api';
    process.env.EXPO_PUBLIC_API_DEBUGHOST = 'checkpointapi.localhost';

    expect(getApiImageSource('http://localhost/storage/checkpoint/photo.jpg')).toEqual({
      uri: 'http://127.0.0.1:18080/storage/checkpoint/photo.jpg',
      headers: { Host: 'checkpointapi.localhost' },
    });
  });

  it('leaves production image URLs unchanged when debug host is unset', () => {
    delete process.env.EXPO_PUBLIC_API_DEBUGHOST;
    const imageUrl = 'https://checkpointapi.hd-desk.com/storage/checkpoint/photo.jpg';

    expect(getApiImageSource(imageUrl)).toEqual({ uri: imageUrl });
  });
});
