import type { PageData } from '../common/page';
import {
  APPLICATION_TYPE,
  APPLICATION_TYPE_LABELS,
  AUTHORITY_TYPE_LABELS,
  AUTHORITY_TYPE_OPTIONS,
  CHANNEL_LABELS,
  CHANNEL_OPTIONS,
  CLAIM_TYPE_LABELS,
  CLAIM_TYPE_OPTIONS,
  CLIENT_CHANGE_TYPE_LABELS,
  CLIENT_CHANGE_TYPE_OPTIONS,
  DOCUMENT_DELIVERY_TYPE_LABELS,
  DOCUMENT_DELIVERY_TYPE_OPTIONS,
  DOCUMENT_TYPE_LABELS,
  DOCUMENT_TYPE_OPTIONS,
  GENDER,
  GENDER_LABELS,
  GENDER_OPTIONS,
  PRODUCT_CATEGORY_LABELS,
  PRODUCT_CATEGORY_OPTIONS,
  SERVICE_ACTION_TYPE_LABELS,
  SERVICE_ACTION_TYPE_OPTIONS,
  SERVICE_TYPE_LABELS,
  SERVICE_TYPE_OPTIONS,
  STATUS_BUSINESS,
  STATUS_BUSINESS_LABELS,
  STATUS_BUSINESS_OPTIONS,
} from './enums';

export type SelectOption = {
  code: string;
  label: string;
};

export type GridSize = { xs: number; md: number };

export type FieldType =
  | 'text'
  | 'textarea'
  | 'date'
  | 'datetime-local'
  | 'select'
  | 'number';

export type FieldConfig<TKey extends string = string> = {
  key: TKey;
  label: string;
  type: FieldType;
  options?: SelectOption[];
  labels?: Record<string, string>;
  gridSize?: GridSize;
  required?: boolean;
  readOnly?: boolean;
  /** Скрыто при создании (только для редактирования). */
  editOnly?: boolean;
  /** Скрыто при редактировании (только для создания). */
  createOnly?: boolean;
};

export type ColumnConfig<TKey extends string = string> = {
  key: TKey;
  label: string;
  minWidth?: number;
  labels?: Record<string, string>;
  format?: 'date' | 'datetime';
};

export type ApplicationConfig<
  TDto extends { id: string; statusBusiness: string },
  TFilters extends Record<string, string>,
  TQueryParams,
  TCreate = Record<string, unknown>,
  TUpdate = Record<string, unknown>,
> = {
  title: string;
  description: string;
  path: string;
  applicationTypeCode: string;
  emptyFilters: TFilters;
  filterFields: FieldConfig<keyof TFilters & string>[];
  columns: ColumnConfig<keyof TDto & string>[];
  formFields: FieldConfig<string>[];
  buildDefaults: () => Record<string, unknown>;
  toQueryParams: (
    filters: TFilters,
    pagination?: { pageNo?: number; pageSize?: number; sortKey?: string }
  ) => TQueryParams;
  api: {
    search: (params: TQueryParams) => Promise<PageData<TDto>>;
    create: (payload: TCreate) => Promise<TDto>;
    update: (id: string, payload: TUpdate) => Promise<TDto>;
    delete: (id: string) => Promise<void>;
  };
};

export const COMMON_FILTER_FIELDS: FieldConfig<string>[] = [
  {
    key: 'statusBusiness',
    label: 'Статус',
    type: 'select',
    options: STATUS_BUSINESS_OPTIONS,
    labels: STATUS_BUSINESS_LABELS,
    gridSize: { xs: 12, md: 4 },
  },
  {
    key: 'number',
    label: 'Номер заявления',
    type: 'text',
    gridSize: { xs: 12, md: 4 },
  },
  {
    key: 'createdDateFrom',
    label: 'Дата создания с',
    type: 'date',
    gridSize: { xs: 12, md: 4 },
  },
  {
    key: 'createdDateTo',
    label: 'Дата создания по',
    type: 'date',
    gridSize: { xs: 12, md: 4 },
  },
  {
    key: 'lastName',
    label: 'Фамилия',
    type: 'text',
    gridSize: { xs: 12, md: 4 },
  },
  {
    key: 'firstName',
    label: 'Имя',
    type: 'text',
    gridSize: { xs: 12, md: 4 },
  },
  {
    key: 'patronymic',
    label: 'Отчество',
    type: 'text',
    gridSize: { xs: 12, md: 4 },
  },
  {
    key: 'birthDate',
    label: 'Дата рождения',
    type: 'date',
    gridSize: { xs: 12, md: 4 },
  },
  {
    key: 'gender',
    label: 'Пол',
    type: 'select',
    options: GENDER_OPTIONS,
    labels: GENDER_LABELS,
    gridSize: { xs: 12, md: 4 },
  },
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
    key: 'itn',
    label: 'ИНН',
    type: 'text',
    gridSize: { xs: 12, md: 4 },
  },
  {
    key: 'insuranceNumber',
    label: 'СНИЛС',
    type: 'text',
    gridSize: { xs: 12, md: 4 },
  },
];

export const COMMON_COLUMNS: ColumnConfig<string>[] = [
  {
    key: 'statusBusiness',
    label: 'Статус',
    minWidth: 140,
    labels: STATUS_BUSINESS_LABELS,
  },
  { key: 'reason', label: 'Причина / разъяснение', minWidth: 220 },
  { key: 'number', label: 'Номер', minWidth: 140 },
  {
    key: 'applicationType',
    label: 'Тип заявления',
    minWidth: 160,
    labels: APPLICATION_TYPE_LABELS,
  },
  {
    key: 'channel',
    label: 'Канал',
    minWidth: 140,
    labels: CHANNEL_LABELS,
  },
  {
    key: 'createdDate',
    label: 'Дата создания',
    minWidth: 170,
    format: 'datetime',
  },
  {
    key: 'closedDate',
    label: 'Дата закрытия',
    minWidth: 170,
    format: 'datetime',
  },
  { key: 'lastName', label: 'Фамилия', minWidth: 120 },
  { key: 'firstName', label: 'Имя', minWidth: 100 },
];

export const CLIENT_IDENTITY_FORM_FIELDS: FieldConfig<string>[] = [
  {
    key: 'lastName',
    label: 'Фамилия',
    type: 'text',
    required: true,
    gridSize: { xs: 12, md: 4 },
  },
  {
    key: 'firstName',
    label: 'Имя',
    type: 'text',
    required: true,
    gridSize: { xs: 12, md: 4 },
  },
  {
    key: 'patronymic',
    label: 'Отчество',
    type: 'text',
    gridSize: { xs: 12, md: 4 },
  },
  {
    key: 'birthDate',
    label: 'Дата рождения',
    type: 'date',
    required: true,
    gridSize: { xs: 12, md: 4 },
  },
  {
    key: 'gender',
    label: 'Пол',
    type: 'select',
    options: GENDER_OPTIONS,
    labels: GENDER_LABELS,
    required: true,
    gridSize: { xs: 12, md: 4 },
  },
  {
    key: 'identityDocumentSeries',
    label: 'Серия паспорта',
    type: 'text',
    required: true,
    gridSize: { xs: 12, md: 4 },
  },
  {
    key: 'identityDocumentNumber',
    label: 'Номер паспорта',
    type: 'text',
    gridSize: { xs: 12, md: 4 },
  },
  {
    key: 'itn',
    label: 'ИНН',
    type: 'text',
    gridSize: { xs: 12, md: 4 },
  },
  {
    key: 'insuranceNumber',
    label: 'СНИЛС',
    type: 'text',
    gridSize: { xs: 12, md: 4 },
  },
];

export const COMMON_FORM_FIELDS: FieldConfig<string>[] = [
  {
    key: 'channel',
    label: 'Канал подачи',
    type: 'select',
    options: CHANNEL_OPTIONS,
    labels: CHANNEL_LABELS,
    required: true,
    createOnly: true,
    gridSize: { xs: 12, md: 6 },
  },
  {
    key: 'statusBusiness',
    label: 'Статус',
    type: 'select',
    options: STATUS_BUSINESS_OPTIONS,
    labels: STATUS_BUSINESS_LABELS,
    readOnly: true,
    editOnly: true,
    gridSize: { xs: 12, md: 6 },
  },
  {
    key: 'reason',
    label: 'Причина / разъяснение',
    type: 'textarea',
    readOnly: true,
    editOnly: true,
    gridSize: { xs: 12, md: 12 },
  },
  ...CLIENT_IDENTITY_FORM_FIELDS,
];

export function buildClientFormDefaults() {
  return {
    channel: '',
    statusBusiness: STATUS_BUSINESS.IN_QUEUE,
    reason: '',
    lastName: '',
    firstName: '',
    patronymic: '',
    birthDate: '',
    gender: GENDER.UNDEFINED,
    identityDocumentSeries: '',
    identityDocumentNumber: '',
    itn: '',
    insuranceNumber: '',
  };
}

export function isQueued(statusBusiness: string) {
  return statusBusiness === STATUS_BUSINESS.IN_QUEUE;
}

export const APPLICATION_TYPE_FIELD_OPTIONS = Object.values(
  APPLICATION_TYPE
).map((code) => ({ code, label: APPLICATION_TYPE_LABELS[code] }));

export {
  PRODUCT_CATEGORY_OPTIONS,
  PRODUCT_CATEGORY_LABELS,
  SERVICE_TYPE_OPTIONS,
  SERVICE_TYPE_LABELS,
  SERVICE_ACTION_TYPE_OPTIONS,
  SERVICE_ACTION_TYPE_LABELS,
  CLIENT_CHANGE_TYPE_OPTIONS,
  CLIENT_CHANGE_TYPE_LABELS,
  DOCUMENT_TYPE_OPTIONS,
  DOCUMENT_TYPE_LABELS,
  DOCUMENT_DELIVERY_TYPE_OPTIONS,
  DOCUMENT_DELIVERY_TYPE_LABELS,
  CLAIM_TYPE_OPTIONS,
  CLAIM_TYPE_LABELS,
  AUTHORITY_TYPE_OPTIONS,
  AUTHORITY_TYPE_LABELS,
};
