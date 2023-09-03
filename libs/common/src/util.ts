export function getSkipAndTake(
  page: number,
  size: number,
): { skip: number; take: number } {
  const skip = (page - 1) * size;
  const take = size;

  return { skip, take };
}
