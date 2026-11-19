import axios from 'axios';

const apiHost = process.env.EXPO_PUBLIC_API_DEBUGHOST;

const ApiClient = axios.create({
  headers: apiHost ? { Host: apiHost } : undefined,
});

export default ApiClient;
