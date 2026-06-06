export function anomalyRisk(
  spread: number,
  atr: number
) {

  if(
    spread > 70 &&
    atr > 80
  ) {
    return true;
  }

  return false;
}