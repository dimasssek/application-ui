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
import type { AuthorityType } from './enums';

export type AuthorityApplication = ApplicationTo & {
  authorityType: AuthorityType;
  personName: string;
  documentNumber: string | null;
  validUntil: string | null;
};

export type AuthorityApplicationCreateRequest = ApplicationCreateRequest & {
  authorityType: AuthorityType;
  personName: string;
  documentNumber?: string | null;
  validUntil?: string | null;
};

export type AuthorityApplicationUpdateRequest = ApplicationUpdateRequest & {
  authorityType: AuthorityType;
  personName: string;
  documentNumber?: string | null;
  validUntil?: string | null;
};

export type AuthorityApplicationQueryParams = BaseApplicationQueryParams & {
  authorityType?: AuthorityType;
  personName?: string;
};

export type AuthorityApplicationSearchFilters = BaseApplicationSearchFilters & {
  authorityType: string;
  personName: string;
};

export const EMPTY_AUTHORITY_APPLICATION_SEARCH_FILTERS: AuthorityApplicationSearchFilters =
  {
    ...EMPTY_BASE_APPLICATION_SEARCH_FILTERS,
    authorityType: '',
    personName: '',
  };

export function toAuthorityApplicationQueryParams(
  filters: AuthorityApplicationSearchFilters,
  pagination?: Pick<BaseApplicationQueryParams, 'pageNo' | 'pageSize' | 'sortKey'>
): AuthorityApplicationQueryParams {
  const base = toBaseApplicationQueryParams(filters, pagination);
  const specific: Omit<
    AuthorityApplicationQueryParams,
    keyof BaseApplicationQueryParams
  > = {};

  if (filters.authorityType.trim()) {
    specific.authorityType = filters.authorityType as AuthorityType;
  }
  if (filters.personName.trim()) {
    specific.personName = filters.personName.trim();
  }

  return mergeQueryParams(base, specific);
}
