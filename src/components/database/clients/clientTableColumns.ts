import type { ClientSearchFilters } from '../../../types/client';

export type ClientFilterFieldKey = keyof ClientSearchFilters;

export type ClientFilterFieldConfig = {
  key: ClientFilterFieldKey;
  label: string;
  type: 'text' | 'date' | 'datetime-local';
  gridSize?: { xs: number; md: number };
};

export const CLIENT_FILTER_FIELDS: ClientFilterFieldConfig[] = [
  { key: 'lastName', label: 'Фамилия', type: 'text', gridSize: { xs: 12, md: 4 } },
  { key: 'firstName', label: 'Имя', type: 'text', gridSize: { xs: 12, md: 4 } },
  { key: 'patronymic', label: 'Отчество', type: 'text', gridSize: { xs: 12, md: 4 } },
  { key: 'birthDate', label: 'Дата рождения', type: 'date', gridSize: { xs: 12, md: 4 } },
  { key: 'gender', label: 'Пол', type: 'text', gridSize: { xs: 12, md: 4 } },
  { key: 'status', label: 'Статус', type: 'text', gridSize: { xs: 12, md: 4 } },
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
    key: 'actualDate',
    label: 'Дата обновления записи',
    type: 'datetime-local',
    gridSize: { xs: 12, md: 4 },
  },
  {
    key: 'residenceAddressName',
    label: 'Адрес места жительства',
    type: 'text',
    gridSize: { xs: 12, md: 12 },
  },
];

export type ClientTableColumn = {
  key: ClientFilterFieldKey;
  label: string;
  minWidth?: number;
};

export const CLIENT_TABLE_COLUMNS: ClientTableColumn[] = [
  { key: 'lastName', label: 'Фамилия', minWidth: 120 },
  { key: 'firstName', label: 'Имя', minWidth: 100 },
  { key: 'patronymic', label: 'Отчество', minWidth: 120 },
  { key: 'birthDate', label: 'Дата рождения', minWidth: 120 },
  { key: 'gender', label: 'Пол', minWidth: 90 },
  { key: 'identityDocumentSeries', label: 'Серия', minWidth: 80 },
  { key: 'identityDocumentNumber', label: 'Номер', minWidth: 100 },
  { key: 'identityDocumentIssueDate', label: 'Дата выдачи', minWidth: 110 },
  { key: 'itn', label: 'ИНН', minWidth: 120 },
  { key: 'insuranceNumber', label: 'СНИЛС', minWidth: 130 },
  { key: 'actualDate', label: 'Дата обновления', minWidth: 160 },
  { key: 'residenceAddressName', label: 'Адрес', minWidth: 220 },
  { key: 'status', label: 'Статус', minWidth: 100 },
];

export const CLIENT_FILTER_LABELS: Record<ClientFilterFieldKey, string> =
  CLIENT_FILTER_FIELDS.reduce(
    (acc, field) => {
      acc[field.key] = field.label;
      return acc;
    },
    {} as Record<ClientFilterFieldKey, string>
  );
