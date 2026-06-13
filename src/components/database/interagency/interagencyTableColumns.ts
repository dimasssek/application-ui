import type { ExternalRequestListTo } from '../../../types/externalRequest';
import {
  lookupLabel,
  REQUEST_STATUS_LABELS,
  SOURCE_TYPE_LABELS,
} from '../../../types/client/enums';

export type InteragencyColumn = {
  key: keyof ExternalRequestListTo;
  label: string;
  minWidth?: number;
  labels?: Record<string, string>;
  format?: 'date' | 'datetime';
};

export const INTERAGENCY_TABLE_COLUMNS: InteragencyColumn[] = [
  {
    key: 'letterNumber',
    label: 'Номер запроса',
    minWidth: 140,
  },
  {
    key: 'letterDate',
    label: 'Дата запроса',
    minWidth: 120,
    format: 'date',
  },
  {
    key: 'sourceType',
    label: 'Ведомство',
    minWidth: 100,
    labels: SOURCE_TYPE_LABELS,
  },
  {
    key: 'status',
    label: 'Статус',
    minWidth: 130,
    labels: REQUEST_STATUS_LABELS,
  },
  {
    key: 'initiatorLogin',
    label: 'Инициатор',
    minWidth: 120,
  },
  {
    key: 'created',
    label: 'Создан',
    minWidth: 160,
    format: 'datetime',
  },
  {
    key: 'batchCount',
    label: 'Пачек',
    minWidth: 80,
  },
  {
    key: 'requestCount',
    label: 'Запросов',
    minWidth: 90,
  },
];

export function formatInteragencyCell(
  item: ExternalRequestListTo,
  column: InteragencyColumn
): string {
  const raw = item[column.key];
  if (raw == null || raw === '') {
    return '';
  }
  const value = String(raw);
  if (column.labels) {
    return lookupLabel(column.labels, value);
  }
  if (column.format === 'datetime') {
    const date = new Date(value);
    return Number.isNaN(date.getTime())
      ? value
      : date.toLocaleString('ru-RU');
  }
  if (column.format === 'date') {
    const date = new Date(value);
    return Number.isNaN(date.getTime())
      ? value
      : date.toLocaleDateString('ru-RU');
  }
  return value;
}
