import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface ConvertCurrencyData {
  value: number;
  to: string;
}

export interface ConvertCurrencyResponse {
    convertedValue: number,
    from: string,
    to: string,
    date: string,
    rate: number,
    message: number
}

export interface Rate {
   EUR: number,
   KES: number 
}

export interface RateResponse {
    base_currency: string,
    date: string,
    rates: Rate,
    id: number,
    createdAt: string,
    updatedAt: string,
    message: string
}

export interface HistoricRate {
    date: string,
    rate: number,
}

export interface CurrencyAnalytics {
    rates: HistoricRate[],
    message: string
}

export interface TimeSeriesRateInput {
  start_date: string;
  end_date: string;
}

export interface AnalyticsInput {
    start_date: string,
    end_date: string,
    currency: string
}

const baseQuery = fetchBaseQuery({
    baseUrl: '/api'
})

export const currencyExchangeApi = createApi({
    reducerPath: 'CURRENCY_EXCHANGE_API',
    baseQuery: baseQuery,
    tagTypes: ['Rate', 'RateData'],
    endpoints: (builder) => ({
        updateRates: builder.mutation<RateResponse, void>({
            query: () => ({ url: '/exchange/update-rate', method: 'PUT' }),
            invalidatesTags: (result, error) => [{ type: 'Rate' }],
        }),
        convertCurrency: builder.mutation<ConvertCurrencyResponse, ConvertCurrencyData>({
            query: ({ value, to }) => ({
                url: `/exchange/latest/convert`,
                method: 'POST',
                body: { value: value, to: to },
            }),
        }),
        getHistoricRate: builder.query<RateResponse, string>({
            query: (date) => ({
                url: `/exchange/historic/${date}`,
                method: 'GET'
            }),
        }),
        getTimeSeriesRate: builder.query<RateResponse, TimeSeriesRateInput>({
            query: ({ start_date, end_date }) => ({
                url: `/exchange/timeseries/${start_date}/${end_date}`,
                method: 'GET'
            }),
        }),
        getLatestRate: builder.query<RateResponse, void>({
            query: () => ({
                url: `/exchange/latest`,
                method: 'GET'
            }),
            providesTags: (result, error) => [{ type: 'Rate' }],
        }),
        getCurrencyAnalytics: builder.query<CurrencyAnalytics, AnalyticsInput >({
            query: ({ start_date, end_date, currency }) => ({
                url: `/exchange/analytics?start_date=${start_date}&end_date=${end_date}&currency=${currency}`,
                method: 'GET'
            }),
            providesTags: (result, error) => [{ type: 'RateData' }],
        }),
    })
})


 export const { useUpdateRatesMutation, useConvertCurrencyMutation, useGetHistoricRateQuery, useGetTimeSeriesRateQuery, useGetLatestRateQuery, useGetCurrencyAnalyticsQuery } = currencyExchangeApi
