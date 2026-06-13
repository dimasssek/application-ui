/** Оставляет только цифры (до 6) и расставляет двоеточия: 12 → 12, 1234 → 12:34, 123456 → 12:34:56 */
export function formatTimeInput(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 6);

  if (digits.length === 0) {
    return '';
  }
  if (digits.length <= 2) {
    return digits;
  }
  if (digits.length <= 4) {
    return `${digits.slice(0, 2)}:${digits.slice(2)}`;
  }
  return `${digits.slice(0, 2)}:${digits.slice(2, 4)}:${digits.slice(4)}`;
}
