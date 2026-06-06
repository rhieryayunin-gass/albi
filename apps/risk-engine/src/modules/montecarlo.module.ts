export function montecarloRisk(
  riskOfRuin: number,
  expectedWinrate: number
) {

  let score = 0;

  if(riskOfRuin > 7)
    score -= 40;

  if(expectedWinrate > 65)
    score += 15;

  if(expectedWinrate < 50)
    score -= 25;

  return score;
}