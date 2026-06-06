import {
  IsString,
  IsNumber,
} from 'class-validator';

export class RiskDto {
  @IsString()
  signal!: string;

  @IsNumber()
  confidence!: number;

  @IsNumber()
  uncertainty!: number;

  @IsNumber()
  spread!: number;

  @IsNumber()
  atr!: number;

  @IsNumber()
  exposure!: number;

  @IsNumber()
  openPositions!: number;

  @IsNumber()
  expectedWinrate!: number;

  @IsNumber()
  expectedDrawdown!: number;

  @IsNumber()
  riskOfRuin!: number;

  @IsString()
  liquidityState!: string;

  @IsString()
  executionQuality!: string;

  @IsString()
  session!: string;

  @IsString()
  regime!: string;
}