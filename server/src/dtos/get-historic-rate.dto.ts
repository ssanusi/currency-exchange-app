import { IsString, Matches } from 'class-validator';

export class GetHistoricRateDto {
  @IsString()
  // @Matches(`^\d{4}-\d{2}-\d{2}$`, 'i')
  date: string;
}
