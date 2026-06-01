import { Injectable } from '@nestjs/common';


// ========================================
// TYPES
// ========================================

export interface RiskValidationInput {
  confidence: number;

  exposure: number;

  openPositions: number;

  spread: number;

  atr: number;

  session: string;

  expectedPnl: number;

  expectedWinrate: number;

  expectedDrawdown: number;

  approved?: boolean;
}


export interface RiskValidationResult {
  approved: boolean;

  reason: string | null;

  score: number;

  warnings: string[];

  riskLevel: string;
}


// ========================================
// SERVICE
// ========================================

@Injectable()
export class AiEngineService {

  // ======================================
  // MAIN VALIDATOR
  // ======================================

  validateTrade(
    data: RiskValidationInput,
  ): RiskValidationResult {

    let score = 100;

    const warnings: string[] =
      [];

    // ====================================
    // HARD LIMITS
    // ====================================

    const hardLimitResult =
      this.checkHardLimits(
        data,
      );

    if (
      !hardLimitResult.approved
    ) {
      return {
        approved: false,

        reason:
          hardLimitResult.reason,

        score: 0,

        warnings:
          hardLimitResult.warnings,

        riskLevel:
          'CRITICAL',
      };
    }

    // ====================================
    // CONFIDENCE
    // ====================================

    if (
      data.confidence >= 90
    ) {
      score += 10;
    }

    else if (
      data.confidence >= 80
    ) {
      score += 5;
    }

    else if (
      data.confidence < 75
    ) {
      score -= 25;

      warnings.push(
        'LOW_CONFIDENCE',
      );
    }

    // ====================================
    // SPREAD
    // ====================================

    if (
      data.spread > 45
    ) {
      score -= 35;

      warnings.push(
        'HIGH_SPREAD',
      );
    }

    else if (
      data.spread > 30
    ) {
      score -= 15;

      warnings.push(
        'MEDIUM_SPREAD',
      );
    }

    // ====================================
    // ATR / VOLATILITY
    // ====================================

    if (data.atr > 50) {
      score -= 30;

      warnings.push(
        'EXTREME_VOLATILITY',
      );
    }

    else if (
      data.atr > 35
    ) {
      score -= 15;

      warnings.push(
        'HIGH_VOLATILITY',
      );
    }

    // ====================================
    // SESSION FILTER
    // ====================================

    if (
      data.session ===
      'ASIA'
    ) {
      score -= 10;

      warnings.push(
        'LOW_LIQUIDITY_SESSION',
      );
    }

    if (
      data.session ===
      'AFTER_HOURS'
    ) {
      score -= 25;

      warnings.push(
        'DEAD_MARKET_SESSION',
      );
    }

    // ====================================
    // MONTE CARLO
    // ====================================

    if (
      data.expectedWinrate >=
      65
    ) {
      score += 15;
    }

    else if (
      data.expectedWinrate >=
      55
    ) {
      score += 5;
    }

    else {
      score -= 25;

      warnings.push(
        'LOW_EXPECTED_WINRATE',
      );
    }

    // ====================================
    // EXPECTED DRAWDOWN
    // ====================================

    if (
      data.expectedDrawdown >
      100
    ) {
      score -= 35;

      warnings.push(
        'EXTREME_DRAWDOWN',
      );
    }

    else if (
      data.expectedDrawdown >
      70
    ) {
      score -= 20;

      warnings.push(
        'HIGH_DRAWDOWN',
      );
    }

    // ====================================
    // EXPECTED PNL
    // ====================================

    if (
      data.expectedPnl > 0
    ) {
      score += 10;
    }

    else {
      score -= 15;

      warnings.push(
        'NEGATIVE_EXPECTANCY',
      );
    }

    // ====================================
    // EXPOSURE
    // ====================================

    if (
      data.exposure >= 0.4
    ) {
      score -= 20;

      warnings.push(
        'HIGH_EXPOSURE',
      );
    }

    else if (
      data.exposure >= 0.3
    ) {
      score -= 10;

      warnings.push(
        'MEDIUM_EXPOSURE',
      );
    }

    // ====================================
    // OPEN POSITIONS
    // ====================================

    if (
      data.openPositions >=
      1
    ) {
      score -= 15;

      warnings.push(
        'POSITION_ALREADY_EXISTS',
      );
    }

    // ====================================
    // FINAL SCORE CLAMP
    // ====================================

    score = Math.max(
      0,
      Math.min(score, 100),
    );

    // ====================================
    // FINAL APPROVAL
    // ====================================

    const approved =
      score >= 70;

    return {
      approved,

      reason: approved
        ? null
        : 'RISK_ENGINE_REJECTED',

      score,

      warnings,

      riskLevel:
        this.calculateRiskLevel(
          score,
        ),
    };
  }


  // ======================================
  // HARD LIMITS
  // ======================================

  private checkHardLimits(
    data: RiskValidationInput,
  ) {
    const warnings: string[] =
      [];

    // ====================================
    // MAX EXPOSURE
    // ====================================

    if (
      data.exposure > 0.5
    ) {
      warnings.push(
        'MAX_EXPOSURE_LIMIT',
      );

      return {
        approved: false,

        reason:
          'MAX_EXPOSURE_LIMIT',

        warnings,
      };
    }

    // ====================================
    // MAX POSITIONS
    // ====================================

    if (
      data.openPositions >=
      1
    ) {
      warnings.push(
        'MAX_POSITION_LIMIT',
      );

      return {
        approved: false,

        reason:
          'MAX_POSITION_LIMIT',

        warnings,
      };
    }

    // ====================================
    // EXTREME SPREAD
    // ====================================

    if (
      data.spread > 70
    ) {
      warnings.push(
        'EXTREME_SPREAD',
      );

      return {
        approved: false,

        reason:
          'EXTREME_SPREAD',

        warnings,
      };
    }

    // ====================================
    // EXTREME ATR
    // ====================================

    if (
      data.atr > 80
    ) {
      warnings.push(
        'EXTREME_VOLATILITY',
      );

      return {
        approved: false,

        reason:
          'EXTREME_VOLATILITY',

        warnings,
      };
    }

    // ====================================
    // BAD MONTE CARLO
    // ====================================

    if (
      data.expectedWinrate <
      45
    ) {
      warnings.push(
        'BAD_MONTE_CARLO',
      );

      return {
        approved: false,

        reason:
          'BAD_MONTE_CARLO',

        warnings,
      };
    }

    return {
      approved: true,

      reason: null,

      warnings,
    };
  }


  // ======================================
  // RISK LEVEL
  // ======================================

  private calculateRiskLevel(
    score: number,
  ) {
    if (score >= 90) {
      return 'LOW';
    }

    if (score >= 75) {
      return 'MEDIUM';
    }

    if (score >= 60) {
      return 'HIGH';
    }

    return 'CRITICAL';
  }
}

