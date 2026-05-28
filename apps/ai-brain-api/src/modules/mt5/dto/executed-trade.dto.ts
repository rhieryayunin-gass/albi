import {
  IsNumber,
  IsString,
} from 'class-validator';

export class ExecutedTradeDto {
  @IsString()
  symbol!: string;

  @IsString()
  type!: string;

  @IsNumber()
  lot!: number;

  @IsNumber()
  entryPrice!: number;

  @IsNumber()
  stopLoss!: number;

  @IsNumber()
  takeProfit!: number;

  @IsNumber()
  ticket!: number;
}