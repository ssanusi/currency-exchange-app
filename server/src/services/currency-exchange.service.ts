import { ExchangeRateEntity } from '@/entity/exchange-rate.entity';
import { ExchangeRate } from '@/interfaces/exchange-rate.interface';
import axios, { AxiosResponse, AxiosInstance } from 'axios';
import { getRepository } from 'typeorm';

class CurrencyExchangeService {
  currencyExchangeBaseUrl = process.env.currencyExchangeBaseUrl;
  client: AxiosInstance;
  exchangeRate = ExchangeRateEntity;
  constructor() {
    this.client = axios.create({
      baseURL: `${this.currencyExchangeBaseUrl}`,
    });
  }

  public async getCurrentRate(): Promise<AxiosResponse<any, any>> {
    const rate: AxiosResponse = await this.client.get(`/latest?base=USD&symbols=EUR,KES`);
    return rate;
  }

  public async getHistoricRate(date: string): Promise<AxiosResponse<any, any>> {
    const rate: AxiosResponse = await this.client.get(`/${date}?base=USD&symbols=KES,EUR`);
    return rate;
  }

  public async getTimeSeriesRate(start_date: string, end_date: string): Promise<AxiosResponse<any, any>> {
    const rate: AxiosResponse = await this.client.get(`/timeseries?start_date=${start_date}&end_date=${end_date}&base=USD&symbols=KES,EUR`);
    return rate;
  }

  public async updateExchange(): Promise<ExchangeRate> {
    const { data } = await this.getCurrentRate();
    const exchangeRateRepository = getRepository(this.exchangeRate);
    const exchange = exchangeRateRepository.save({
      base_currency: data.base,
      date: new Date(data.date),
      rates: data.rates,
    });
    return exchange;
  }

  public async convertCurrency(value: number, to: string): Promise<any> {
    const exchangeRateRepository = getRepository(this.exchangeRate);
    const rates = await exchangeRateRepository.find({
      order: {
        date: 'DESC',
      },
      take: 1,
    });
    const currentRate = rates[0].rates[to];
    return {
      convertedValue: value * currentRate,
      from: rates[0].base_currency,
      to,
      date: rates[0].date,
      rate: currentRate,
    };
  }

  public async getHistoricCurrency(date: string): Promise<ExchangeRate> {
    const exchangeRateRepository = getRepository(this.exchangeRate);
    const { data } = await this.getHistoricRate(date);
    const exchange = exchangeRateRepository.save({
      base_currency: data.base,
      date: new Date(data.date),
      rates: data.rates,
    });
    return exchange;
  }

  public async getTimeSeries(start_date: string, end_date: string): Promise<ExchangeRate[]> {
    const exchangeRateRepository = getRepository(this.exchangeRate);
    const { data } = await this.getTimeSeriesRate(start_date, end_date);
    const ratesArray = [];
    Object.entries(data.rates).forEach(([key, value]) => {
      ratesArray.push({
        base_currency: data.base,
        date: new Date(key),
        rates: value,
      });
    });
    const exchange = exchangeRateRepository.save(ratesArray);
    return exchange;
  }
}

export default CurrencyExchangeService;
