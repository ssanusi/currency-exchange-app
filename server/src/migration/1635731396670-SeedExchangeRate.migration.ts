import CurrencyExchangeService from '@/services/currency-exchange.service';
import { MigrationInterface, QueryRunner } from 'typeorm';
import moment from 'moment';

export class SeedExchangeRate1635731396670 implements MigrationInterface {
  currencyExchangeService = new CurrencyExchangeService();
  end_date = moment().format('YYYY-MM-DD');
  start_date = moment().subtract(30, 'days').format('YYYY-MM-DD');

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.currencyExchangeService.updateTimeSeries(this.start_date, this.end_date);
    console.log('##########SEED RUN###########');
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public down(queryRunner: QueryRunner): Promise<void> {}
}
