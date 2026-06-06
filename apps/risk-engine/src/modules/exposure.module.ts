export function exposureRisk(
  exposure: number
) {

  if(exposure >= 0.5)
    return -100;

  if(exposure >= 0.4)
    return -25;

  if(exposure >= 0.3)
    return -10;

  return 10;
}