import { IsNumber, IsString, Matches } from 'class-validator';

export enum CURRENCY {
  EUR,
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
