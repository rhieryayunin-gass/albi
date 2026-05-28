import {
  IsNumber,
  IsString,
} from 'class-validator';

export class MarketDataDto {
  @IsString()
  symbol!: string;

  @IsNumber()
  bid!: number;

  @IsNumber()
  ask!: number;

  @IsNumber()
  spread!: number;

  @IsNumber()
  balance!: number;

  @IsNumber()
  equity!: number;
}