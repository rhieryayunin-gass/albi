import { Injectable } from '@nestjs/common';

@Injectable()
export class AiEngineService {
  analyzeMarket(data: any) {
    const random = Math.random();

    if (random > 0.7) {
      return {
        action: 'BUY',
        confidence: 92,
      };
    }

    if (random < 0.3) {
      return {
        action: 'SELL',
        confidence: 88,
      };
    }

    return {
      action: 'WAIT',
      confidence: 50,
    };
  }
}