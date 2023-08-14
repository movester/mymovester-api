export function getSkipAndTake(page: number): { skip: number; take: number } {
  const skip = (page - 1) * 10;
  const take = 10;

  return { skip, take };
}
