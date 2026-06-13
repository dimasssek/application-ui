import type {
  ApplicationType,
  Channel,
  Gender,
  StatusBusiness,
  StatusInternal,
} from './enums';

/**
 * Базовое DTO заявления (ApplicationTo).
 * Поля совпадают с backend-контрактом (camelCase).
 */
export type ApplicationTo = {
  id: string;
  clientId: string | null;
  number: string;
  applicationType: ApplicationType;
  channel: Channel;
  statusInternal: StatusInternal;
  statusBusiness: StatusBusiness;
  reason: string | null;
  createdDate: string;
  closedDate: string | null;
  lastName: string;
  firstName: string;
  patronymic: string | null;
  birthDate: string;
  gender: Gender;
  identityDocumentSeries: string;
  identityDocumentNumber: string | null;
  itn: string | null;
  insuranceNumber: string | null;
};

/** Базовый запрос на создание (ApplicationCreateRequest). */
export type ApplicationCreateRequest = {
  channel: Channel;
  lastName: string;
  firstName: string;
  patronymic?: string | null;
  birthDate: string;
  gender: Gender;
  identityDocumentSeries: string;
  identityDocumentNumber?: string | null;
  itn?: string | null;
  insuranceNumber?: string | null;
};

/** Базовый запрос на обновление (ApplicationUpdateRequest). Без channel. */
export type ApplicationUpdateRequest = Omit<
  ApplicationCreateRequest,
  'channel'
>;

/** Базовые параметры поиска (BaseApplicationQueryParams). */
export type BaseApplicationQueryParams = {
  deleted?: boolean;
  statusBusiness?: StatusBusiness;
  number?: string;
  createdDateFrom?: string;
  createdDateTo?: string;
  lastName?: string;
  firstName?: string;
  patronymic?: string;
  identityDocumentSeries?: string;
  identityDocumentNumber?: string;
  itn?: string;
  insuranceNumber?: string;
  birthDate?: string;
  gender?: Gender;
  pageNo?: number;
  pageSize?: number;
  sortKey?: string;
};

/** UI-фильтры общей части (строковые поля для формы поиска). */
export type BaseApplicationSearchFilters = {
  statusBusiness: string;
  number: string;
  createdDateFrom: string;
  createdDateTo: string;
  lastName: string;
  firstName: string;
  patronymic: string;
  identityDocumentSeries: string;
  identityDocumentNumber: string;
  itn: string;
  insuranceNumber: string;
  birthDate: string;
  gender: string;
};

export const EMPTY_BASE_APPLICATION_SEARCH_FILTERS: BaseApplicationSearchFilters =
  {
    statusBusiness: '',
    number: '',
    createdDateFrom: '',
    createdDateTo: '',
    lastName: '',
    firstName: '',
    patronymic: '',
    identityDocumentSeries: '',
    identityDocumentNumber: '',
    itn: '',
    insuranceNumber: '',
    birthDate: '',
    gender: '',
  };

export const DEFAULT_APPLICATION_SORT_KEY = 'createdDate,desc';
export const DEFAULT_APPLICATION_PAGE_SIZE = 10;

export function toBaseApplicationQueryParams(
  filters: BaseApplicationSearchFilters,
  pagination?: Pick<
    BaseApplicationQueryParams,
    'pageNo' | 'pageSize' | 'sortKey'
  >
): BaseApplicationQueryParams {
  const params: BaseApplicationQueryParams = {
    deleted: false,
    pageNo: pagination?.pageNo ?? 0,
    pageSize: pagination?.pageSize ?? DEFAULT_APPLICATION_PAGE_SIZE,
    sortKey: pagination?.sortKey ?? DEFAULT_APPLICATION_SORT_KEY,
  };

  if (filters.statusBusiness.trim()) {
    params.statusBusiness = filters.statusBusiness as StatusBusiness;
  }
  if (filters.number.trim()) params.number = filters.number.trim();
  if (filters.createdDateFrom.trim()) {
    params.createdDateFrom = toOffsetDateTimeStart(filters.createdDateFrom);
  }
  if (filters.createdDateTo.trim()) {
    params.createdDateTo = toOffsetDateTimeEnd(filters.createdDateTo);
  }
  if (filters.lastName.trim()) params.lastName = filters.lastName.trim();
  if (filters.firstName.trim()) params.firstName = filters.firstName.trim();
  if (filters.patronymic.trim()) params.patronymic = filters.patronymic.trim();
  if (filters.identityDocumentSeries.trim()) {
    params.identityDocumentSeries = filters.identityDocumentSeries.trim();
  }
  if (filters.identityDocumentNumber.trim()) {
    params.identityDocumentNumber = filters.identityDocumentNumber.trim();
  }
  if (filters.itn.trim()) params.itn = filters.itn.trim();
  if (filters.insuranceNumber.trim()) {
    params.insuranceNumber = filters.insuranceNumber.trim();
  }
  if (filters.birthDate.trim()) params.birthDate = filters.birthDate.trim();
  if (filters.gender.trim()) params.gender = filters.gender as Gender;

  return params;
}

/** Начало дня в ISO OffsetDateTime для API-поиска. */
function toOffsetDateTimeStart(date: string): string {
  return `${date}T00:00:00+00:00`;
}

/** Конец дня в ISO OffsetDateTime для API-поиска. */
function toOffsetDateTimeEnd(date: string): string {
  return `${date}T23:59:59+00:00`;
}

export function mergeQueryParams<T extends BaseApplicationQueryParams>(
  base: BaseApplicationQueryParams,
  specific: Omit<T, keyof BaseApplicationQueryParams>
): T {
  return { ...base, ...specific } as T;
}
