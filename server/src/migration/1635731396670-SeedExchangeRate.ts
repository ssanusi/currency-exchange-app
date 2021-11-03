import CurrencyExchangeService from '@/services/currency-exchange.service';
import { MigrationInterface, QueryRunner } from 'typeorm';
import moment from 'moment';

export class SeedExchangeRate1635731396670 implements MigrationInterface {
  currencyExchangeService = new CurrencyExchangeService();
  start_date = moment().format('YYYY-MM-DD');
  end_date = moment().subtract(7).format('YYYY-MM-DD');
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.currencyExchangeService.getTimeSeries(this.start_date, this.end_date);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
