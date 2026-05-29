import {
  IsNumber,
  IsString,
} from 'class-validator';

export class RiskCheckDto {
  @IsString()
  symbol!: string;

  @IsString()
  type!: string;

  @IsNumber()
  lot!: number;

  @IsNumber()
  confidence!: number;

  @IsNumber()
  openPositions!: number;

  @IsNumber()
  totalExposure!: number;
}