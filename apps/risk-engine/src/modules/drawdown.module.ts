export function drawdownRisk(
  dd: number
) {

  if(dd > 100)
    return -40;

  if(dd > 70)
    return -25;

  if(dd > 40)
    return -10;

  return 10;
}