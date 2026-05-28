import { Injectable } from '@nestjs/common';

@Injectable()
export class Mt5Service {
  heartbeat() {
    return {
      connected: true,
      timestamp: new Date(),
    };
  }
}