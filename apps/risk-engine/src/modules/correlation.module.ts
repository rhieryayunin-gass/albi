export function correlationRisk(
  regime: string
) {

  if(regime === "VOLATILE")
    return -20;

  return 5;
}