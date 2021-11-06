import { NextFunction, Request, Response } from 'express';
import CurrencyExchangeService from '@/services/currency-exchange.service';
import { ExchangeRate } from '@/interfaces/exchange-rate.interface';
import { ConvertCurrencyDto } from '@/dtos/currency-convert.dto';

class CurrencyExchangeController {
  public currencyExchangeService = new CurrencyExchangeService();

  public updateCurrency = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const currency: ExchangeRate = await this.currencyExchangeService.updateExchange();
      res.status(200).json({ ...currency, message: 'Updated Currency Rate' });
    } catch (error) {
      next(error);
    }
  };

  public convertCurrency = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const currencyData: ConvertCurrencyDto = req.body;
      const convertedValue = await this.currencyExchangeService.convertCurrency(currencyData.value, currencyData.to);
      res.status(200).json({ ...convertedValue, message: 'Converted value' });
    } catch (error) {
      next(error);
    }
  };

  public getHistoricCurrency = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { date } = req.params;
      const rate = await this.currencyExchangeService.getHistoricCurrency(date);
      res.status(200).json({ ...rate, message: `Currency Rate as at ${date}` });
    } catch (error) {
      next(error);
    }
  };

  public getTimeSeriesCurrency = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { start_date, end_date } = req.params;
      const rate = await this.currencyExchangeService.getTimeSeries(start_date, end_date);
      res.status(200).json({ ...rate, message: `Currency Rates from ${start_date} to ${end_date}` });
    } catch (error) {
      next(error);
    }
  };

  public getLatestRate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const rate = await this.currencyExchangeService.getLatest();
      res.status(200).json({ ...rate, message: `Latest Rates` });
    } catch (error) {
      next(error);
    }
  };
}

export default CurrencyExchangeController;
