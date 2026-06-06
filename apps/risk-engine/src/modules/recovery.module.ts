export function recoveryMode(
  score: number
) {

  if(score < 60)
    return "DEFENSIVE";

  if(score < 75)
    return "MODERATE";

  return "NORMAL";
}