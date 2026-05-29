import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfidenceEngineService {
  calculate(data: any) {
    let confidence = 50;

    if (
      data.h4Trend ===
      data.h1Trend
    ) {
      confidence += 20;
    }

    if (data.m15Validation) {
      confidence += 15;
    }

    if (data.m5Entry) {
      confidence += 10;
    }

    confidence += Math.floor(
      Math.random() * 10,
    );

    return Math.min(
      confidence,
      99,
    );
  }
}