import { Injectable } from '@nestjs/common';

import { ExposureState }
from './types/exposure-state.type';

@Injectable()
export class ExposureService {
  private exposureState: ExposureState =
    {
      openPositions: 0,

      totalExposure: 0,

      floatingPnl: 0,

      activeSymbols: [],
    };

  getState() {
    return this.exposureState;
  }

  updateState(
    data: ExposureState,
  ) {
    this.exposureState = data;
  }
}