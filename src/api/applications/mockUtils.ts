export function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/** crypto.randomUUID() с fallback'ом на случай старого окружения. */
export function generateId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `id-${Math.random().toString(36).slice(2)}-${Date.now()}`;
}

export function normalize(value: string) {
  return value.trim().toLowerCase();
}

export function matchesText(value: string, filter: string) {
  if (!filter.trim()) {
    return true;
  }
  return normalize(String(value ?? '')).includes(normalize(filter));
}

export function matchesDate(value: string | null, filter: string) {
  if (!filter.trim()) {
    return true;
  }
  return normalize(String(value ?? '')).includes(normalize(filter));
}

export function matchesExact(value: string | null, filter: string) {
  if (!filter.trim()) {
    return true;
  }
  return String(value ?? '') === filter;
}
