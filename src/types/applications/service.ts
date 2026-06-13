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
import type { ServiceActionType, ServiceType } from './enums';

export type ServiceApplication = ApplicationTo & {
  serviceType: ServiceType;
  serviceName: string;
  actionType: ServiceActionType;
};

export type ServiceApplicationCreateRequest = ApplicationCreateRequest & {
  serviceType: ServiceType;
  serviceName: string;
  actionType: ServiceActionType;
};

export type ServiceApplicationUpdateRequest = ApplicationUpdateRequest & {
  serviceType: ServiceType;
  serviceName: string;
  actionType: ServiceActionType;
};

export type ServiceApplicationQueryParams = BaseApplicationQueryParams & {
  serviceType?: ServiceType;
  serviceName?: string;
  actionType?: ServiceActionType;
};

export type ServiceApplicationSearchFilters = BaseApplicationSearchFilters & {
  serviceType: string;
  serviceName: string;
  actionType: string;
};

export const EMPTY_SERVICE_APPLICATION_SEARCH_FILTERS: ServiceApplicationSearchFilters =
  {
    ...EMPTY_BASE_APPLICATION_SEARCH_FILTERS,
    serviceType: '',
    serviceName: '',
    actionType: '',
  };

export function toServiceApplicationQueryParams(
  filters: ServiceApplicationSearchFilters,
  pagination?: Pick<BaseApplicationQueryParams, 'pageNo' | 'pageSize' | 'sortKey'>
): ServiceApplicationQueryParams {
  const base = toBaseApplicationQueryParams(filters, pagination);
  const specific: Omit<
    ServiceApplicationQueryParams,
    keyof BaseApplicationQueryParams
  > = {};

  if (filters.serviceType.trim()) {
    specific.serviceType = filters.serviceType as ServiceType;
  }
  if (filters.serviceName.trim()) {
    specific.serviceName = filters.serviceName.trim();
  }
  if (filters.actionType.trim()) {
    specific.actionType = filters.actionType as ServiceActionType;
  }

  return mergeQueryParams(base, specific);
}
