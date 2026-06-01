import {
  IsArray,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

import { Type }
from 'class-transformer';


// ========================================
// CANDLE DTO
// ========================================

export class CandleDto {

  @IsNumber()
  open!: number;

  @IsNumber()
  high!: number;

  @IsNumber()
  low!: number;

  @IsNumber()
  close!: number;

  @IsNumber()
  volume!: number;
}


// ========================================
// POSITION DTO
// ========================================

export class PositionDto {

  @IsNumber()
  ticket!: number;

  @IsString()
  type!: string;

  @IsNumber()
  profit!: number;

  @IsNumber()
  volume!: number;

  @IsNumber()
  entry!: number;
}


// ========================================
// MAIN ANALYZE DTO
// ========================================

export class AnalyzeDto {

  // ======================================
  // BASIC MARKET
  // ======================================

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


  // ======================================
  // TECHNICALS
  // ======================================

  @IsNumber()
  atr!: number;

  @IsNumber()
  rsi!: number;

  @IsNumber()
  ema20!: number;

  @IsNumber()
  ema50!: number;

  @IsNumber()
  ema200!: number;


  // ======================================
  // MARKET STRUCTURE
  // ======================================

  @IsString()
  trend!: string;

  @IsString()
  session!: string;


  // ======================================
  // MULTI TIMEFRAME
  // ======================================

  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(() => CandleDto)
  m5!: CandleDto[];

  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(() => CandleDto)
  m15!: CandleDto[];

  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(() => CandleDto)
  h1!: CandleDto[];

  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(() => CandleDto)
  h4!: CandleDto[];


  // ======================================
  // POSITIONS
  // ======================================

  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(() => PositionDto)
  positions!: PositionDto[];
}