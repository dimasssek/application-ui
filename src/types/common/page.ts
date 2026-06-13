/**
 * Общие транспортные типы, совпадающие с backend-контрактами
 * (ru.kubsu.contracts.dto.common).
 */

/** Метаданные страницы (PageMetaData). `number` — 0-based индекс страницы. */
export type PageMetaData = {
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
};

/** Постраничная обёртка ответа (PageData<T>). */
export type PageData<T> = {
  content: T[];
  metaData: PageMetaData;
};

/** Тело ошибки от backend (ErrorResponseTo). */
export type ErrorResponse = {
  code: string;
  message: string;
};
