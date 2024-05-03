export function getSkipAndTake(
  page: number,
  size: number,
): { skip: number; take: number } {
  const skip = (page - 1) * size;
  const take = size;

  return { skip, take };
}

export function isArrayEqual<T>(sourceArray: T[], targetArray: T[]): boolean {
  if (sourceArray.length !== targetArray.length) {
    return false;
  }

  sourceArray.sort();
  targetArray.sort();

  return sourceArray.every((data, index) => data === targetArray[index]);
}
