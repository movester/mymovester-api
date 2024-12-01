import { format } from "date-fns";

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

/**
 * Date 타입을 'yyyy/MM/dd HH:mm:ss'로 변환합니다.
 * @param {Date} date - JavaScript new Date() 타입
 * @returns {string} - 변환된 날짜 문자열 (응답 예시: 'yyyy/MM/dd HH:mm:ss')
 */
export function formatDateToString(date: Date): string {
  return format(date, 'yyyy/MM/dd HH:mm:ss');
}