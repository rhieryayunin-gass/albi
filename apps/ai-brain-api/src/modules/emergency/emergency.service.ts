import { Injectable } from '@nestjs/common';

@Injectable()
export class EmergencyService {
  freezeTrading() {
    return {
      tradingPaused: true,
    };
  }
}