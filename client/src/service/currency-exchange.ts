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

export interface UpdateRateResponse {
    base_currency: string,
    date: string,
    rates: Rate,
    id: number,
    createdAt: string,
    updatedAt: string,
    message: string
}


export interface HistoricRateResponse {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export interface TimeSeriesRateInput {
  start_date: string;
  end_date: string;
}


const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000'
})

export const currencyExchangeApi = createApi({
    reducerPath: 'CURRENCY_EXCHANGE_API',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        updateRates: builder.mutation<UpdateRateResponse, void>({
             query: () => ({ url: '/exchange/update-rate', method: 'PUT' }),
        }),
        convertCurrency: builder.query<ConvertCurrencyResponse, ConvertCurrencyData>({
            query: ({ value, to }) => ({
                url: `/exchange/latest/convert`,
                method: 'POST',
                body: { value: value, to: to },
            }),
        }),
        getHistoricRate: builder.query<HistoricRateResponse, string>({
            query: (date) => ({
                url: `/exchange/historic/${date}`,
                method: 'GET'
            }),
        }),
        getTimeSeriesRate: builder.query<HistoricRateResponse, TimeSeriesRateInput>({
            query: ({ start_date, end_date }) => ({
                url: `/exchange/timeseries/${start_date}/${end_date}`,
                method: 'GET'
            }),
        }),
    })
})


 export const { useUpdateRatesMutation, useConvertCurrencyQuery, useGetHistoricRateQuery, useGetTimeSeriesRateQuery } = currencyExchangeApi
