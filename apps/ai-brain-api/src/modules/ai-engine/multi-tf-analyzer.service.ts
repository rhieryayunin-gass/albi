import { Injectable } from '@nestjs/common';

@Injectable()
export class MultiTfAnalyzerService {
  analyze(data: any) {
    const h4Trend =
      Math.random() > 0.5
        ? 'BULLISH'
        : 'BEARISH';

    const h1Trend =
      Math.random() > 0.5
        ? 'BULLISH'
        : 'BEARISH';

    const m15Validation =
      Math.random() > 0.3;

    const m5Entry =
      Math.random() > 0.4;

    return {
      h4Trend,

      h1Trend,

      m15Validation,

      m5Entry,
    };
  }
}