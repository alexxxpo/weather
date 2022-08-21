import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ICurrentWeather } from './weather.models'

export const weatherApi = createApi({
  reducerPath: 'weather',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.weatherapi.com/v1' }),
  endpoints: (builder) => ({
    getCurrentWeather: builder.query<ICurrentWeather, string>({
      query: (search: string) => ({
        url: '/current.json',
        params: {
          key: 'f65af894f8f34de4908125332221408',
          q: search,
          lang: 'ru'
        }
      }),
      
    }),
  }),
})

export const { useGetCurrentWeatherQuery } = weatherApi