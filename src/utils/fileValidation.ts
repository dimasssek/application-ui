const TXT_EXTENSION = '.txt';

export function isTxtFile(file: File): boolean {
  const name = file.name.toLowerCase().trim();
  if (!name.endsWith(TXT_EXTENSION)) {
    return false;
  }
  if (file.type && file.type !== 'text/plain') {
    return false;
  }
  return true;
}

export function partitionTxtFiles(files: File[]) {
  const accepted: File[] = [];
  const rejected: File[] = [];

  files.forEach((file) => {
    if (isTxtFile(file)) {
      accepted.push(file);
    } else {
      rejected.push(file);
    }
  });

  return { accepted, rejected };
}
