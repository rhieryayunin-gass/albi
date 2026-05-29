import { Injectable } from '@nestjs/common';

import { EmergencyState }
from './types/emergency-state.type';

@Injectable()
export class EmergencyService {
  private state: EmergencyState =
    {
      frozen: false,

      reason: null,

      updatedAt: null,
    };

  getState() {
    return this.state;
  }

  freeze(reason: string) {
    this.state = {
      frozen: true,

      reason,

      updatedAt: new Date(),
    };
  }

  resume() {
    this.state = {
      frozen: false,

      reason: null,

      updatedAt: new Date(),
    };
  }
}