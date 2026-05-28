export class TradeCommandDto {
  action!: 'BUY' | 'SELL' | 'WAIT';

  lot!: number;

  stopLoss!: number;

  takeProfit!: number;

  confidence!: number;
}