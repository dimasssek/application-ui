import type {
  ClientStatus,
  Gender,
  RequestOutcome,
  RequestStatus,
  SourceType,
} from './client/enums';

/** Клиент банка (ClientTo). */
export type ClientTo = {
  id: string;
  lastName: string;
  firstName: string;
  patronymic: string | null;
  birthDate: string;
  gender: Gender;
  identityDocumentSeries: string;
  identityDocumentNumber: string | null;
  identityDocumentIssueDate: string | null;
  itn: string | null;
  insuranceNumber: string | null;
  actualDate: string | null;
  addressDefined: boolean;
  residenceAddressName: string;
  status: ClientStatus;
};

/** Запрос на создание клиента (ClientCreateRequest). */
export type ClientCreateRequest = {
  lastName: string;
  firstName: string;
  patronymic?: string | null;
  birthDate: string;
  gender: Gender;
  identityDocumentSeries: string;
  identityDocumentNumber?: string | null;
  identityDocumentIssueDate?: string | null;
  itn?: string | null;
  insuranceNumber?: string | null;
  addressDefined: boolean;
  residenceAddressName: string;
};

/** Запрос на обновление клиента (ClientUpdateRequest). Поля совпадают с create. */
export type ClientUpdateRequest = ClientCreateRequest;

/** Параметры поиска клиентов (ClientQueryParams). */
export type ClientQueryParams = {
  lastName?: string;
  firstName?: string;
  patronymic?: string;
  birthDate?: string;
  gender?: Gender;
  statuses?: ClientStatus[];
  identityDocumentSeries?: string;
  identityDocumentNumber?: string;
  identityDocumentIssueDate?: string;
  itn?: string;
  insuranceNumber?: string;
  residenceAddressName?: string;
  pageNo?: number;
  pageSize?: number;
  sortKey?: string;
};

export const DEFAULT_CLIENT_SORT_KEY = 'lastName,asc';
export const DEFAULT_CLIENT_PAGE_SIZE = 20;

export const EMPTY_CLIENT_QUERY_PARAMS: ClientQueryParams = {
  pageNo: 0,
  pageSize: DEFAULT_CLIENT_PAGE_SIZE,
  sortKey: DEFAULT_CLIENT_SORT_KEY,
};

/** Фильтры UI поиска клиентов. Маппятся в ClientQueryParams через toClientQueryParams. */
export type ClientSearchFilters = {
  lastName: string;
  firstName: string;
  patronymic: string;
  birthDate: string;
  gender: string;
  statuses: string[];
  identityDocumentSeries: string;
  identityDocumentNumber: string;
  identityDocumentIssueDate: string;
  itn: string;
  insuranceNumber: string;
  residenceAddressName: string;
};

export const EMPTY_CLIENT_SEARCH_FILTERS: ClientSearchFilters = {
  lastName: '',
  firstName: '',
  patronymic: '',
  birthDate: '',
  gender: '',
  statuses: [],
  identityDocumentSeries: '',
  identityDocumentNumber: '',
  identityDocumentIssueDate: '',
  itn: '',
  insuranceNumber: '',
  residenceAddressName: '',
};

/** Запись истории запросов клиента во внешние ведомства (ClientHistoryEntryTo). */
export type ClientHistoryEntryTo = {
  externalRequestId: string;
  letterNumber: string;
  sourceType: SourceType;
  externalRequestStatus: RequestStatus;
  externalRequestCreated: string;
  requestId: string;
  requestStatus: RequestStatus;
  outcome: RequestOutcome;
};

/** Маппинг UI-фильтров в параметры API-поиска. */
export function toClientQueryParams(
  filters: ClientSearchFilters,
  pagination?: Pick<ClientQueryParams, 'pageNo' | 'pageSize' | 'sortKey'>
): ClientQueryParams {
  const params: ClientQueryParams = {
    ...pagination,
    pageNo: pagination?.pageNo ?? 0,
    pageSize: pagination?.pageSize ?? DEFAULT_CLIENT_PAGE_SIZE,
    sortKey: pagination?.sortKey ?? DEFAULT_CLIENT_SORT_KEY,
  };

  if (filters.lastName.trim()) params.lastName = filters.lastName.trim();
  if (filters.firstName.trim()) params.firstName = filters.firstName.trim();
  if (filters.patronymic.trim()) params.patronymic = filters.patronymic.trim();
  if (filters.birthDate.trim()) params.birthDate = filters.birthDate.trim();
  if (filters.gender.trim()) params.gender = filters.gender as Gender;
  if (filters.identityDocumentSeries.trim()) {
    params.identityDocumentSeries = filters.identityDocumentSeries.trim();
  }
  if (filters.identityDocumentNumber.trim()) {
    params.identityDocumentNumber = filters.identityDocumentNumber.trim();
  }
  if (filters.identityDocumentIssueDate.trim()) {
    params.identityDocumentIssueDate = filters.identityDocumentIssueDate.trim();
  }
  if (filters.itn.trim()) params.itn = filters.itn.trim();
  if (filters.insuranceNumber.trim()) {
    params.insuranceNumber = filters.insuranceNumber.trim();
  }
  if (filters.residenceAddressName.trim()) {
    params.residenceAddressName = filters.residenceAddressName.trim();
  }
  if (filters.statuses.length > 0) {
    params.statuses = filters.statuses as ClientStatus[];
  }

  return params;
}
