export function emergencyState(
  score: number
) {

  if(score < 40)
    return true;

  return false;
}