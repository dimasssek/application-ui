import type { ErrorResponse } from '../types/common/page';

/** Базовый URL gateway. Переопределяется через REACT_APP_API_BASE_URL. */
export const API_BASE_URL = (
  process.env.REACT_APP_API_BASE_URL ?? 'http://localhost:8088'
).replace(/\/$/, '');

/** Ошибка API с кодом и HTTP-статусом (тело ErrorResponseTo). */
export class ApiError extends Error {
  readonly code: string;
  readonly status: number;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

async function toApiError(response: Response): Promise<ApiError> {
  let code = 'UNKNOWN';
  let message = `Запрос завершился с ошибкой (${response.status}).`;
  try {
    const body = (await response.json()) as Partial<ErrorResponse> | null;
    if (body && typeof body === 'object') {
      if (body.code) {
        code = body.code;
      }
      if (body.message) {
        message = body.message;
      }
    }
  } catch {
    // Тело ответа не JSON — оставляем значения по умолчанию.
  }
  return new ApiError(response.status, code, message);
}

async function parseBody<T>(response: Response): Promise<T> {
  if (response.status === 204) {
    return undefined as T;
  }
  const text = await response.text();
  if (!text) {
    return undefined as T;
  }
  return JSON.parse(text) as T;
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown
): Promise<T> {
  const hasBody = body !== undefined;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: hasBody ? { 'Content-Type': 'application/json' } : undefined,
    body: hasBody ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw await toApiError(response);
  }
  return parseBody<T>(response);
}

export function httpGet<T>(path: string): Promise<T> {
  return request<T>('GET', path);
}

export function httpPost<T>(path: string, body?: unknown): Promise<T> {
  return request<T>('POST', path, body);
}

export function httpPut<T>(path: string, body?: unknown): Promise<T> {
  return request<T>('PUT', path, body);
}

export function httpDelete<T = void>(path: string): Promise<T> {
  return request<T>('DELETE', path);
}

/**
 * Multipart-загрузка. Content-Type не задаём вручную —
 * браузер сам проставит boundary.
 */
export async function httpPostMultipart<T>(
  path: string,
  formData: FormData
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw await toApiError(response);
  }
  return parseBody<T>(response);
}
