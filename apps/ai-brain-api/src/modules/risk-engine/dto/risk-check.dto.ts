import {
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';


export class RiskCheckDto {

  @IsNumber()
  confidence!: number;

  @IsNumber()
  exposure!: number;

  @IsNumber()
  openPositions!: number;

  @IsNumber()
  spread!: number;

  @IsNumber()
  atr!: number;

  @IsString()
  session!: string;

  @IsNumber()
  expectedPnl!: number;

  @IsNumber()
  expectedWinrate!: number;

  @IsNumber()
  expectedDrawdown!: number;

  @IsOptional()
  approved?: boolean;
}