import type { ImageURISource } from 'react-native';

export const getApiImageSource = (imageUrl: string): ImageURISource => {
  const apiDebugHost = process.env.EXPO_PUBLIC_API_DEBUGHOST;

  if (!apiDebugHost) {
    return { uri: imageUrl };
  }

  const apiBaseUrl = process.env.EXPO_PUBLIC_API_URL;
  if (!apiBaseUrl) {
    throw new Error('EXPO_PUBLIC_API_URL is required when using EXPO_PUBLIC_API_DEBUGHOST.');
  }

  const apiOrigin = apiBaseUrl.replace(/\/api\/?$/, '');
  const imagePath = imageUrl.replace(/^https?:\/\/[^/]+/, '');
  if (apiOrigin === apiBaseUrl || imagePath === imageUrl) {
    throw new Error('Expected an API base URL ending in /api and an absolute image URL.');
  }

  return {
    uri: `${apiOrigin}${imagePath}`,
    headers: { Host: apiDebugHost },
  };
};
