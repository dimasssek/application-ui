import type { ClientSearchFilters, ClientTo } from '../../../types/client';
import {
  CLIENT_STATUS_LABELS,
  CLIENT_STATUS_OPTIONS,
  GENDER_LABELS,
  GENDER_OPTIONS,
} from '../../../types/client/enums';

export type ClientFilterFieldKey = keyof ClientSearchFilters;

export type ClientFilterFieldConfig = {
  key: ClientFilterFieldKey;
  label: string;
  type: 'text' | 'date' | 'select' | 'statuses';
  gridSize?: { xs: number; md: number };
};

export const CLIENT_FILTER_FIELDS: ClientFilterFieldConfig[] = [
  { key: 'lastName', label: 'Фамилия', type: 'text', gridSize: { xs: 12, md: 4 } },
  { key: 'firstName', label: 'Имя', type: 'text', gridSize: { xs: 12, md: 4 } },
  { key: 'patronymic', label: 'Отчество', type: 'text', gridSize: { xs: 12, md: 4 } },
  { key: 'birthDate', label: 'Дата рождения', type: 'date', gridSize: { xs: 12, md: 4 } },
  { key: 'gender', label: 'Пол', type: 'select', gridSize: { xs: 12, md: 4 } },
  { key: 'statuses', label: 'Статус', type: 'statuses', gridSize: { xs: 12, md: 4 } },
  {
    key: 'identityDocumentSeries',
    label: 'Серия паспорта',
    type: 'text',
    gridSize: { xs: 12, md: 4 },
  },
  {
    key: 'identityDocumentNumber',
    label: 'Номер паспорта',
    type: 'text',
    gridSize: { xs: 12, md: 4 },
  },
  {
    key: 'identityDocumentIssueDate',
    label: 'Дата выдачи',
    type: 'date',
    gridSize: { xs: 12, md: 4 },
  },
  { key: 'itn', label: 'ИНН', type: 'text', gridSize: { xs: 12, md: 4 } },
  {
    key: 'insuranceNumber',
    label: 'СНИЛС',
    type: 'text',
    gridSize: { xs: 12, md: 4 },
  },
  {
    key: 'residenceAddressName',
    label: 'Адрес места жительства',
    type: 'text',
    gridSize: { xs: 12, md: 12 },
  },
];

export type ClientTableColumnKey =
  | keyof ClientSearchFilters
  | 'actualDate'
  | 'addressDefined'
  | 'status';

export type ClientTableColumn = {
  key: ClientTableColumnKey;
  label: string;
  minWidth?: number;
  labels?: Record<string, string>;
  format?: 'datetime' | 'boolean';
};

export const CLIENT_TABLE_COLUMNS: ClientTableColumn[] = [
  { key: 'lastName', label: 'Фамилия', minWidth: 120 },
  { key: 'firstName', label: 'Имя', minWidth: 100 },
  { key: 'patronymic', label: 'Отчество', minWidth: 120 },
  { key: 'birthDate', label: 'Дата рождения', minWidth: 120 },
  { key: 'gender', label: 'Пол', minWidth: 90, labels: GENDER_LABELS },
  { key: 'identityDocumentSeries', label: 'Серия', minWidth: 80 },
  { key: 'identityDocumentNumber', label: 'Номер', minWidth: 100 },
  { key: 'identityDocumentIssueDate', label: 'Дата выдачи', minWidth: 110 },
  { key: 'itn', label: 'ИНН', minWidth: 120 },
  { key: 'insuranceNumber', label: 'СНИЛС', minWidth: 130 },
  { key: 'actualDate', label: 'Дата обновления', minWidth: 160, format: 'datetime' },
  {
    key: 'addressDefined',
    label: 'Адрес определён',
    minWidth: 130,
    format: 'boolean',
  },
  { key: 'residenceAddressName', label: 'Адрес', minWidth: 220 },
  { key: 'status', label: 'Статус', minWidth: 100, labels: CLIENT_STATUS_LABELS },
];

export const CLIENT_FILTER_LABELS: Record<ClientFilterFieldKey, string> =
  CLIENT_FILTER_FIELDS.reduce(
    (acc, field) => {
      acc[field.key] = field.label;
      return acc;
    },
    {} as Record<ClientFilterFieldKey, string>
  );

export { GENDER_OPTIONS, CLIENT_STATUS_OPTIONS };

export type ClientRow = ClientTo;
