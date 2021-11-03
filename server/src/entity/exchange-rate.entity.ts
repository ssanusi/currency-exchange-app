import { IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ExchangeRate, Rate } from '@/interfaces/exchange-rate.interface';

@Entity()
export class ExchangeRateEntity implements ExchangeRate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  base_currency: string;

  @Column()
  @IsNotEmpty()
  date: Date;

  @Column({
    type: 'jsonb',
    array: false,
    default: () => "'[]'",
    nullable: false,
  })
  rates: Rate[];

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
