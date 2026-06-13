import {
  APPLICATION_TYPE,
  APPLICATION_TYPE_LABELS,
  CHANNEL_LABELS,
  CHANNEL_OPTIONS,
  CURRENCY_LABELS,
  CURRENCY_OPTIONS,
  STATUS_BUSINESS,
  STATUS_BUSINESS_LABELS,
  STATUS_BUSINESS_OPTIONS,
} from './enums';

export type SelectOption = {
  code: string;
  label: string;
};

export type GridSize = { xs: number; md: number };

export type FieldType = 'text' | 'textarea' | 'date' | 'datetime-local' | 'select';

/** Конфиг одного поля (используется и в фильтре, и в форме). */
export type FieldConfig<TKey extends string = string> = {
  key: TKey;
  label: string;
  type: FieldType;
  options?: SelectOption[];
  /** Подпись значения enum в таблице/чипах. */
  labels?: Record<string, string>;
  gridSize?: GridSize;
  required?: boolean;
  /** Если true — отображается, но недоступно для редактирования. */
  readOnly?: boolean;
};

/** Колонка таблицы (key совпадает с полем DTO). */
export type ColumnConfig<TKey extends string = string> = {
  key: TKey;
  label: string;
  minWidth?: number;
  /** Если задано — рендерится через labels[value]. */
  labels?: Record<string, string>;
  /** Форматирование даты. По умолчанию — без преобразования. */
  format?: 'date' | 'datetime';
};

/**
 * Полный конфиг страницы списка заявлений одного типа.
 * Каждая страница типа — обёртка над ApplicationListPage с этим конфигом.
 */
export type ApplicationConfig<TDto extends { id: string }, TFilters> = {
  /** Заголовок страницы и плитки хаба. */
  title: string;
  /** Подзаголовок страницы. */
  description: string;
  /** Путь страницы (для крошек/навигации). */
  path: string;
  /** Код application_type, проставляется в каждое новое заявление. */
  applicationTypeCode: string;
  /** Пустой набор фильтров. */
  emptyFilters: TFilters;
  /** Поля панели фильтров (в порядке отображения). */
  filterFields: FieldConfig<keyof TFilters & string>[];
  /** Колонки таблицы (в порядке отображения). */
  columns: ColumnConfig<keyof TDto & string>[];
  /** Поля формы добавления/редактирования. */
  formFields: FieldConfig<keyof TDto & string>[];
  /** Дефолтные значения для нового заявления. */
  buildDefaults: () => Partial<TDto>;
  /** Мок-API. */
  api: {
    search: (filters: TFilters) => Promise<{ total: number; items: TDto[] }>;
    create: (payload: Omit<TDto, 'id'>) => Promise<TDto>;
    update: (id: string, payload: Partial<TDto>) => Promise<TDto>;
    delete: (id: string) => Promise<void>;
  };
};

/**
 * Общая часть конфигурации для всех типов заявлений.
 * Импортируется из конкретных конфигов и расширяется специфичными полями.
 */

export const COMMON_FILTER_FIELDS: FieldConfig<string>[] = [
  {
    key: 'status_business',
    label: 'Статус',
    type: 'select',
    options: STATUS_BUSINESS_OPTIONS,
    labels: STATUS_BUSINESS_LABELS,
    gridSize: { xs: 12, md: 4 },
  },
  {
    key: 'reason',
    label: 'Причина / разъяснение',
    type: 'text',
    gridSize: { xs: 12, md: 8 },
  },
  {
    key: 'number',
    label: 'Номер заявления',
    type: 'text',
    gridSize: { xs: 12, md: 4 },
  },
  {
    key: 'channel',
    label: 'Канал подачи',
    type: 'select',
    options: CHANNEL_OPTIONS,
    labels: CHANNEL_LABELS,
    gridSize: { xs: 12, md: 4 },
  },
  {
    key: 'created_date',
    label: 'Дата создания',
    type: 'datetime-local',
    gridSize: { xs: 12, md: 4 },
  },
  {
    key: 'closed_date',
    label: 'Дата закрытия',
    type: 'datetime-local',
    gridSize: { xs: 12, md: 4 },
  },
];

export const COMMON_COLUMNS: ColumnConfig<string>[] = [
  {
    key: 'status_business',
    label: 'Статус',
    minWidth: 140,
    labels: STATUS_BUSINESS_LABELS,
  },
  { key: 'reason', label: 'Причина / разъяснение', minWidth: 220 },
  { key: 'number', label: 'Номер', minWidth: 140 },
  {
    key: 'application_type',
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
    key: 'created_date',
    label: 'Дата создания',
    minWidth: 170,
    format: 'datetime',
  },
  {
    key: 'closed_date',
    label: 'Дата закрытия',
    minWidth: 170,
    format: 'datetime',
  },
];

export const COMMON_FORM_FIELDS: FieldConfig<string>[] = [
  {
    key: 'status_business',
    label: 'Статус',
    type: 'select',
    options: STATUS_BUSINESS_OPTIONS,
    labels: STATUS_BUSINESS_LABELS,
    readOnly: true,
    gridSize: { xs: 12, md: 6 },
  },
  {
    key: 'number',
    label: 'Номер заявления',
    type: 'text',
    required: true,
    gridSize: { xs: 12, md: 6 },
  },
  {
    key: 'reason',
    label: 'Причина / разъяснение',
    type: 'textarea',
    gridSize: { xs: 12, md: 12 },
  },
  {
    key: 'channel',
    label: 'Канал подачи',
    type: 'select',
    options: CHANNEL_OPTIONS,
    labels: CHANNEL_LABELS,
    required: true,
    gridSize: { xs: 12, md: 6 },
  },
  {
    key: 'created_date',
    label: 'Дата создания',
    type: 'datetime-local',
    required: true,
    gridSize: { xs: 12, md: 6 },
  },
  {
    key: 'closed_date',
    label: 'Дата закрытия',
    type: 'datetime-local',
    gridSize: { xs: 12, md: 6 },
  },
];

/** Дефолты общей части заявления. */
export function buildCommonDefaults(applicationTypeCode: string) {
  return {
    application_type: applicationTypeCode,
    channel: '',
    status_internal: 'NEW',
    status_business: STATUS_BUSINESS.QUEUED,
    reason: '',
    number: generateApplicationNumber(),
    created_date: nowDatetimeLocal(),
    closed_date: null,
  };
}

export function generateApplicationNumber() {
  const stamp = Date.now().toString().slice(-8);
  return `APP-${stamp}`;
}

export function nowDatetimeLocal() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 16);
}

/** Подсказка: показать ли подсказку «Доступно только для статуса В очереди». */
export function isQueued(statusBusiness: string) {
  return statusBusiness === STATUS_BUSINESS.QUEUED;
}

export const APPLICATION_TYPE_FIELD_OPTIONS = Object.values(
  APPLICATION_TYPE
).map((code) => ({ code, label: APPLICATION_TYPE_LABELS[code] }));

export const CURRENCY_FIELD = {
  options: CURRENCY_OPTIONS,
  labels: CURRENCY_LABELS,
};
