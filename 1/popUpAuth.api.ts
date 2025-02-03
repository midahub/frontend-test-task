import { api } from '@/app/store/api.ts';
import { ValidateResponseType } from '@/shared/types/types';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    generateFromTelegram: builder.mutation({
      query: (userData) => ({
        url: '/auth/jwt/generate-from-telegram',
        method: 'POST',
        body: userData,
      }),
    }),
    validateUser: builder.query<ValidateResponseType, void>({
      query: () => ({
        url: '/auth/jwt/validate',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGenerateFromTelegramMutation, useValidateUserQuery } = authApi;
