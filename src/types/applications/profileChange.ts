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
import type { ClientChangeType } from './enums';

export type ProfileChangeApplication = ApplicationTo & {
  changeType: ClientChangeType;
  oldValue: string | null;
  newValue: string | null;
};

export type ProfileChangeApplicationCreateRequest =
  ApplicationCreateRequest & {
    changeType: ClientChangeType;
    oldValue?: string | null;
    newValue?: string | null;
  };

export type ProfileChangeApplicationUpdateRequest =
  ApplicationUpdateRequest & {
    changeType: ClientChangeType;
    oldValue?: string | null;
    newValue?: string | null;
  };

export type ProfileChangeApplicationQueryParams =
  BaseApplicationQueryParams & {
    changeType?: ClientChangeType;
  };

export type ProfileChangeApplicationSearchFilters =
  BaseApplicationSearchFilters & {
    changeType: string;
  };

export const EMPTY_PROFILE_CHANGE_APPLICATION_SEARCH_FILTERS: ProfileChangeApplicationSearchFilters =
  {
    ...EMPTY_BASE_APPLICATION_SEARCH_FILTERS,
    changeType: '',
  };

export function toProfileChangeApplicationQueryParams(
  filters: ProfileChangeApplicationSearchFilters,
  pagination?: Pick<BaseApplicationQueryParams, 'pageNo' | 'pageSize' | 'sortKey'>
): ProfileChangeApplicationQueryParams {
  const base = toBaseApplicationQueryParams(filters, pagination);
  const specific: Omit<
    ProfileChangeApplicationQueryParams,
    keyof BaseApplicationQueryParams
  > = {};

  if (filters.changeType.trim()) {
    specific.changeType = filters.changeType as ClientChangeType;
  }

  return mergeQueryParams(base, specific);
}
