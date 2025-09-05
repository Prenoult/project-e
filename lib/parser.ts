/**
 * Parses a string into a number while handling decimal commas.
 *
 * Replaces commas with dots before using `parseFloat`. Returns `NaN`
 * for empty or missing strings.
 *
 * @param value String to parse (e.g., "12,5" or "12.5").
 * @returns Parsed number, or `NaN` if invalid.
 * @example
 * parseNumber("3,14") // 3.14
 * parseNumber("") // NaN
 */
export function parseNumber(value: string) {
  if (!value) return NaN;
  return parseFloat(value.replace(',', '.'));
}
