export function portfolioRisk(
  positions: number
) {

  if(positions >= 3)
    return -100;

  if(positions == 2)
    return -15;

  return 10;
}