import { formatTimeInput } from './timeInput';

describe('formatTimeInput', () => {
  it('inserts colons as digits are typed', () => {
    expect(formatTimeInput('1')).toBe('1');
    expect(formatTimeInput('12')).toBe('12');
    expect(formatTimeInput('123')).toBe('12:3');
    expect(formatTimeInput('1234')).toBe('12:34');
    expect(formatTimeInput('12345')).toBe('12:34:5');
    expect(formatTimeInput('123456')).toBe('12:34:56');
  });

  it('removes colons when digits are deleted', () => {
    expect(formatTimeInput('12:34:5')).toBe('12:34:5');
    expect(formatTimeInput('12:34')).toBe('12:34');
    expect(formatTimeInput('12:3')).toBe('12:3');
    expect(formatTimeInput('12')).toBe('12');
    expect(formatTimeInput('1')).toBe('1');
    expect(formatTimeInput('')).toBe('');
  });

  it('ignores manually typed colons and non-digits', () => {
    expect(formatTimeInput('12:34:56')).toBe('12:34:56');
    expect(formatTimeInput('ab12cd34')).toBe('12:34');
  });
});
