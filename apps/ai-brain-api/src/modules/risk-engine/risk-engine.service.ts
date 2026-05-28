import { Injectable } from '@nestjs/common';

@Injectable()
export class RiskEngineService {
  validateTrade() {
    return {
      allowed: true,
    };
  }
}