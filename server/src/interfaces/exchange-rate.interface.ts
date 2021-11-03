export interface Rate {
  [currency: string]: { rate: number };
}

export interface ExchangeRate {
  id: number;
  date: Date;
  base_currency: string;
  rates: Rate[];
}
