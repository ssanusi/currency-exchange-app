import { IsString, Matches } from 'class-validator';
import { CURRENCY } from './currency-convert.dto';

export class GetAnalyticsRateDto {
  @IsString()
  start_date: string;

  @IsString()
  end_date: string;

  @IsString()
  @Matches(
    `^${Object.values(CURRENCY)
      .filter(v => typeof v !== 'number')
      .join('|')}$`,
    'i',
  )
  currency: string;
}
