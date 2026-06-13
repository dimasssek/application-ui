import { isTxtFile, partitionTxtFiles } from './fileValidation';

describe('fileValidation', () => {
  it('accepts .txt files', () => {
    const file = new File(['data'], 'report.txt', { type: 'text/plain' });
    expect(isTxtFile(file)).toBe(true);
  });

  it('rejects non-txt files', () => {
    const file = new File(['data'], 'report.csv', { type: 'text/csv' });
    expect(isTxtFile(file)).toBe(false);
  });

  it('partitions mixed file lists', () => {
    const txt = new File(['a'], 'a.txt', { type: 'text/plain' });
    const csv = new File(['b'], 'b.csv', { type: 'text/csv' });
    const result = partitionTxtFiles([txt, csv]);
    expect(result.accepted).toHaveLength(1);
    expect(result.rejected).toHaveLength(1);
  });
});
