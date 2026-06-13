import { Injectable }
from "@nestjs/common";

import { RiskDto }
from "./dto/risk.dto";

import { exposureRisk }
from "./modules/exposure.module";

import { drawdownRisk }
from "./modules/drawdown.module";

import { volatilityRisk }
from "./modules/volatility.module";

import { liquidityRisk }
from "./modules/liquidity.module";

import { executionRisk }
from "./modules/execution.module";

import { montecarloRisk }
from "./modules/montecarlo.module";

import { correlationRisk }
from "./modules/correlation.module";

import { portfolioRisk }
from "./modules/portfolio.module";

import { anomalyRisk }
from "./modules/anomaly.module";

import { recoveryMode }
from "./modules/recovery.module";

import { emergencyState }
from "./modules/emergency.module";

@Injectable()

export class RiskEngineService {

  analyze(
    data: RiskDto
  ) {

    let score = 70;

    score += exposureRisk(
      data.exposure
    );

    score += drawdownRisk(
      data.expectedDrawdown
    );

    score += volatilityRisk(
      data.atr
    );

    score += liquidityRisk(
      data.liquidityState
    );

    score += executionRisk(
      data.executionQuality
    );

    score += montecarloRisk(
      data.riskOfRuin,
      data.expectedWinrate
    );

    score += correlationRisk(
      data.regime
    );

    score += portfolioRisk(
      data.openPositions
    );

    if(data.confidence >= 80)
      score += 10;

    if(data.confidence < 60)
      score -= 20;

    if(data.uncertainty > 40)
      score -= 25;

    const anomaly =
    anomalyRisk(
      data.spread,
      data.atr
    );

    if(anomaly)
      score -= 100;

    score =
    Math.max(
      0,
      Math.min(score, 100)
    );

    let riskLevel =
    "MODERATE";

    if(score >= 90)
      riskLevel = "SAFE";

    else if(score >= 75)
      riskLevel = "MODERATE";

    else if(score >= 60)
      riskLevel = "ELEVATED";

    else if(score >= 40)
      riskLevel = "HIGH_RISK";

    else
      riskLevel = "CRITICAL";

    let threshold = 70;

    if(data.atr > 60)
      threshold = 80;

    if(data.atr > 80)
      threshold = 90;

    const approved =
    score >= threshold;

    return {

      approved,

      risk_level:
      riskLevel,

      score,

      threshold,

      emergency_state:
      emergencyState(score),

      recommended_mode:
      recoveryMode(score),

      max_allowed_lot:
      approved
      ? 0.50
      : 0.01,

      tail_risk:
      score < 50
      ? "HIGH"
      : "LOW",

      portfolio_pressure:
      data.openPositions >= 2
      ? "HIGH"
      : "LOW",

      risk_of_ruin:
      data.riskOfRuin,

      warnings:
      approved
      ? []
      : [
          "RISK REJECTED"
        ]
    };
  }
}