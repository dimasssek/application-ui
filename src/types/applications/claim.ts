import type {
  ApplicationCreateRequest,
  ApplicationTo,
  ApplicationUpdateRequest,
  BaseApplicationQueryParams,
  BaseApplicationSearchFilters,
} from './common';
import {
  EMPTY_BASE_APPLICATION_SEARCH_FILTERS,
  mergeQueryParams,
  toBaseApplicationQueryParams,
} from './common';
import type { ClaimType } from './enums';

export type ClaimApplication = ApplicationTo & {
  claimType: ClaimType;
  claimSubject: string;
  description: string | null;
  externalRef: string | null;
};

export type ClaimApplicationCreateRequest = ApplicationCreateRequest & {
  claimType: ClaimType;
  claimSubject: string;
  description?: string | null;
  externalRef?: string | null;
};

export type ClaimApplicationUpdateRequest = ApplicationUpdateRequest & {
  claimType: ClaimType;
  claimSubject: string;
  description?: string | null;
  externalRef?: string | null;
};

export type ClaimApplicationQueryParams = BaseApplicationQueryParams & {
  claimType?: ClaimType;
  claimSubject?: string;
};

export type ClaimApplicationSearchFilters = BaseApplicationSearchFilters & {
  claimType: string;
  claimSubject: string;
};

export const EMPTY_CLAIM_APPLICATION_SEARCH_FILTERS: ClaimApplicationSearchFilters =
  {
    ...EMPTY_BASE_APPLICATION_SEARCH_FILTERS,
    claimType: '',
    claimSubject: '',
  };

export function toClaimApplicationQueryParams(
  filters: ClaimApplicationSearchFilters,
  pagination?: Pick<BaseApplicationQueryParams, 'pageNo' | 'pageSize' | 'sortKey'>
): ClaimApplicationQueryParams {
  const base = toBaseApplicationQueryParams(filters, pagination);
  const specific: Omit<
    ClaimApplicationQueryParams,
    keyof BaseApplicationQueryParams
  > = {};

  if (filters.claimType.trim()) {
    specific.claimType = filters.claimType as ClaimType;
  }
  if (filters.claimSubject.trim()) {
    specific.claimSubject = filters.claimSubject.trim();
  }

  return mergeQueryParams(base, specific);
}
