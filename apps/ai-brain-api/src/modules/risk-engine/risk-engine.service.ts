import { Injectable } from '@nestjs/common';

import { RiskCheckDto }
from './dto/risk-check.dto';

import { RiskResult }
from './types/risk-result.type';

@Injectable()
export class RiskEngineService {
  validateTrade(
    dto: RiskCheckDto,
  ): RiskResult {
    // MAX LOT

    if (dto.lot > 0.5) {
      return {
        approved: false,

        reason:
          'MAX_LOT_EXCEEDED',
      };
    }

    // MAX POSITIONS

    if (dto.openPositions >= 3) {
      return {
        approved: false,

        reason:
          'MAX_POSITIONS_REACHED',
      };
    }

    // BLOCK RE-ENTRY IF 0.5 ACTIVE

    if (
      dto.totalExposure >= 0.5
    ) {
      return {
        approved: false,

        reason:
          'MAX_EXPOSURE_ACTIVE',
      };
    }

    // CONFIDENCE FILTER

    if (dto.confidence < 85) {
      return {
        approved: false,

        reason:
          'LOW_CONFIDENCE',
      };
    }

    return {
      approved: true,
    };
  }
}