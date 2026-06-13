import type { Gender, RequestStatus, SourceType } from './client/enums';

export type ExternalRequestSummaryTo = {
  pendingCount: number;
  updatedCount: number;
  actualCount: number;
  notFoundCount: number;
  errorCount: number;
};

export type RequestTo = {
  id: string;
  clientId: string | null;
  messageId: string;
  status: RequestStatus;
  errorMessage: string | null;
  firstName: string;
  lastName: string;
  patronymic: string | null;
  birthDate: string;
  gender: Gender;
  identityDocumentSeries: string;
  identityDocumentNumber: string | null;
  identityDocumentIssueDate: string | null;
  itn: string | null;
  insuranceNumber: string | null;
  type: string;
  outcome: string | null;
};

export type BatchRequestTo = {
  id: string;
  messageId: string;
  createdDate: string;
  messageCount: number;
  requests: RequestTo[] | null;
};

export type ExternalRequestTo = {
  id: string;
  letterNumber: string;
  letterDate: string;
  sourceType: SourceType;
  status: RequestStatus;
  initiatorLogin: string;
  created: string;
  batches: BatchRequestTo[] | null;
  summary: ExternalRequestSummaryTo | null;
};

export type ExternalRequestListTo = {
  id: string;
  letterNumber: string;
  letterDate: string;
  sourceType: SourceType;
  status: RequestStatus;
  initiatorLogin: string;
  created: string;
  batchCount: number;
  requestCount: number;
};

export type ExternalRequestBatchCreateRequest = {
  letterNumber: string;
  letterDate: string;
  sourceType: SourceType;
  initiatorLogin: string;
  clientIds: string[];
};

export type ExternalRequestManualCreateRequest = {
  letterNumber: string;
  letterDate: string;
  sourceType: SourceType;
  initiatorLogin: string;
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
};

export type ExternalRequestQueryParams = {
  letterNumber?: string;
  letterDate?: string;
  sourceType?: SourceType;
  statuses?: RequestStatus[];
  initiatorLogin?: string;
  pageNo?: number;
  pageSize?: number;
  sortKey?: string;
};

export type ExternalRequestSearchFilters = {
  letterNumber: string;
  letterDate: string;
  sourceType: string;
  statuses: string[];
  initiatorLogin: string;
};

export const EMPTY_EXTERNAL_REQUEST_SEARCH_FILTERS: ExternalRequestSearchFilters =
  {
    letterNumber: '',
    letterDate: '',
    sourceType: '',
    statuses: [],
    initiatorLogin: '',
  };

export const DEFAULT_EXTERNAL_REQUEST_SORT_KEY = 'created,desc';
export const DEFAULT_EXTERNAL_REQUEST_PAGE_SIZE = 10;

export function toExternalRequestQueryParams(
  filters: ExternalRequestSearchFilters,
  pagination?: Pick<
    ExternalRequestQueryParams,
    'pageNo' | 'pageSize' | 'sortKey'
  >
): ExternalRequestQueryParams {
  const params: ExternalRequestQueryParams = {
    pageNo: pagination?.pageNo ?? 0,
    pageSize: pagination?.pageSize ?? DEFAULT_EXTERNAL_REQUEST_PAGE_SIZE,
    sortKey: pagination?.sortKey ?? DEFAULT_EXTERNAL_REQUEST_SORT_KEY,
  };

  if (filters.letterNumber.trim()) {
    params.letterNumber = filters.letterNumber.trim();
  }
  if (filters.letterDate.trim()) {
    params.letterDate = filters.letterDate.trim();
  }
  if (filters.sourceType.trim()) {
    params.sourceType = filters.sourceType as SourceType;
  }
  if (filters.statuses.length > 0) {
    params.statuses = filters.statuses as RequestStatus[];
  }
  if (filters.initiatorLogin.trim()) {
    params.initiatorLogin = filters.initiatorLogin.trim();
  }

  return params;
}
