export function volatilityRisk(
  atr: number
) {

  if(atr > 80)
    return -100;

  if(atr > 60)
    return -35;

  if(atr > 40)
    return -15;

  return 10;
}