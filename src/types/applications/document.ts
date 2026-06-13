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
import type { DocumentDeliveryType, DocumentType } from './enums';

export type DocumentApplication = ApplicationTo & {
  documentType: DocumentType;
  deliveryType: DocumentDeliveryType | null;
  purpose: string | null;
};

export type DocumentApplicationCreateRequest = ApplicationCreateRequest & {
  documentType: DocumentType;
  deliveryType?: DocumentDeliveryType | null;
  purpose?: string | null;
};

export type DocumentApplicationUpdateRequest = ApplicationUpdateRequest & {
  documentType: DocumentType;
  deliveryType?: DocumentDeliveryType | null;
  purpose?: string | null;
};

export type DocumentApplicationQueryParams = BaseApplicationQueryParams & {
  documentType?: DocumentType;
  deliveryType?: DocumentDeliveryType;
};

export type DocumentApplicationSearchFilters = BaseApplicationSearchFilters & {
  documentType: string;
  deliveryType: string;
};

export const EMPTY_DOCUMENT_APPLICATION_SEARCH_FILTERS: DocumentApplicationSearchFilters =
  {
    ...EMPTY_BASE_APPLICATION_SEARCH_FILTERS,
    documentType: '',
    deliveryType: '',
  };

export function toDocumentApplicationQueryParams(
  filters: DocumentApplicationSearchFilters,
  pagination?: Pick<BaseApplicationQueryParams, 'pageNo' | 'pageSize' | 'sortKey'>
): DocumentApplicationQueryParams {
  const base = toBaseApplicationQueryParams(filters, pagination);
  const specific: Omit<
    DocumentApplicationQueryParams,
    keyof BaseApplicationQueryParams
  > = {};

  if (filters.documentType.trim()) {
    specific.documentType = filters.documentType as DocumentType;
  }
  if (filters.deliveryType.trim()) {
    specific.deliveryType = filters.deliveryType as DocumentDeliveryType;
  }

  return mergeQueryParams(base, specific);
}
