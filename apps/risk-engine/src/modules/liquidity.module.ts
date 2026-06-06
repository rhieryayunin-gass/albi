export function liquidityRisk(
  liquidity: string
) {

  if(liquidity === "THIN")
    return -50;

  if(liquidity === "NORMAL")
    return -10;

  return 10;
}