import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import CurrencyExchangeController from '@/controllers/exchange.controller';
import { ConvertCurrencyDto } from '@/dtos/currency-convert.dto';
import { GetHistoricRateDto } from '@/dtos/get-historic-rate.dto';

class CurrencyExchangeRoute implements Routes {
  public path = '/exchange';
  public router = Router();
  public exchangeController = new CurrencyExchangeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.put(`${this.path}/update-rate`, this.exchangeController.updateCurrency);
    this.router.get(`${this.path}/historic/:date`, validationMiddleware(GetHistoricRateDto, 'params'), this.exchangeController.getHistoricCurrency);
    this.router.get(`${this.path}/latest`, this.exchangeController.getLatestRate);
    this.router.post(`${this.path}/latest/convert`, validationMiddleware(ConvertCurrencyDto, 'body'), this.exchangeController.convertCurrency);
    this.router.put(`${this.path}/timeseries/:start_date/:end_date`, this.exchangeController.updateTimeSeriesCurrency);
    this.router.get(`${this.path}/timeseries`, this.exchangeController.getTimeSeriesCurrency);
    this.router.get(`${this.path}/analytics`, this.exchangeController.getCurrencyAnalytics);
  }
}

export default CurrencyExchangeRoute;
