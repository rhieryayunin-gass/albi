import {
  IsArray,
  IsNumber,
} from 'class-validator';

export class ExposureUpdateDto {
  @IsNumber()
  openPositions!: number;

  @IsNumber()
  totalExposure!: number;

  @IsNumber()
  floatingPnl!: number;

  @IsArray()
  activeSymbols!: string[];
}