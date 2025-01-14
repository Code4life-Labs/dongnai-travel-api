/**
 * Use this function to count words
 * @param text
 * @returns
 */
export function countWords(text: string) {
  if (!text) return 0;
  return text.split(/[\s|\n]/).filter((word) => Boolean(word)).length;
}
