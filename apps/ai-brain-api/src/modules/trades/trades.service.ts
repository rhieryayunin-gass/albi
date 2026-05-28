import { Injectable } from '@nestjs/common';

@Injectable()
export class TradesService {
  processTrade(data: any) {
    console.log(data);

    return {
      processed: true,
    };
  }
}