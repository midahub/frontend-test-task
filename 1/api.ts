import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

async function refreshTokens() {
  const accessToken = localStorage.getItem('authToken');
  const refreshToken = localStorage.getItem('refreshToken');

  if (!accessToken || !refreshToken) {
    console.error('Access or refresh token is missing.');
    return false;
  }

  try {
    const response = await fetch('https://api.arsen-support.ru/auth/jwt/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
      body: JSON.stringify({
        access_token: accessToken,
        refresh_token: refreshToken,
      }),
    });

    const data = await response.json();

    localStorage.setItem('authToken', data.access_token);
    // localStorage.setItem('refreshToken', data.refresh_token);

    return true;
  } catch (error) {
    console.error('Error refreshing tokens:', error);
    return false;
  }
}

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api.arsen-support.ru',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('authToken');

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ДЛЯ ЛОКАЛЬНОГО ТЕСТИРОВАНИЯ (закоментируй 42-46 строку и подставь свой токен в Bearer ) !!!!!!!!!!!!!!!!!!!!!!!!!!!
    // const tokenTest = '';
    // headers.set('authorization', `Bearer ${tokenTest} `);
    // localStorage.setItem('authToken', tokenTest);

    return headers;
  },
});

export const api = createApi({
  reducerPath: 'api',
  baseQuery: async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
      const tokensUpdated = await refreshTokens();

      if (tokensUpdated) {
        result = await baseQuery(args, api, extraOptions);
      }
    }

    return result;
  },
  refetchOnMountOrArgChange: true,
  tagTypes: ['Subchannels', 'Subchannel'],
  endpoints: () => ({}),
});
