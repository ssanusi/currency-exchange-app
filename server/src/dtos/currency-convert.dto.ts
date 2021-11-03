import { IsNumber, IsString, Matches } from 'class-validator';

export enum CURRENCY {
  USD,
  KES,
}
export class ConvertCurrencyDto {
  @IsNumber()
  public value: number;

  @IsString()
  @Matches(
    `^${Object.values(CURRENCY)
      .filter(v => typeof v !== 'number')
      .join('|')}$`,
    'i',
  )
  to: string;
}
