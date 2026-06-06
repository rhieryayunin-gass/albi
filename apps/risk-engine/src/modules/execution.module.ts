export function executionRisk(
  executionQuality: string
) {

  if(executionQuality === "BAD")
    return -100;

  if(executionQuality === "RISKY")
    return -25;

  return 10;
}