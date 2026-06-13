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
import type { ProductCategory } from './enums';

export type ProductApplication = ApplicationTo & {
  productCategory: ProductCategory;
  productCode: string | null;
  productName: string;
  amount: number | null;
  termMonths: number | null;
  purpose: string | null;
  tariffCode: string | null;
  externalProductId: string | null;
};

export type ProductApplicationCreateRequest = ApplicationCreateRequest & {
  productCategory: ProductCategory;
  productCode?: string | null;
  productName: string;
  amount?: number | null;
  termMonths?: number | null;
  purpose?: string | null;
  tariffCode?: string | null;
  externalProductId?: string | null;
};

export type ProductApplicationUpdateRequest = ApplicationUpdateRequest & {
  productCategory: ProductCategory;
  productCode?: string | null;
  productName: string;
  amount?: number | null;
  termMonths?: number | null;
  purpose?: string | null;
  tariffCode?: string | null;
  externalProductId?: string | null;
};

export type ProductApplicationQueryParams = BaseApplicationQueryParams & {
  productCategory?: ProductCategory;
  productCode?: string;
  productName?: string;
};

export type ProductApplicationSearchFilters = BaseApplicationSearchFilters & {
  productCategory: string;
  productCode: string;
  productName: string;
};

export const EMPTY_PRODUCT_APPLICATION_SEARCH_FILTERS: ProductApplicationSearchFilters =
  {
    ...EMPTY_BASE_APPLICATION_SEARCH_FILTERS,
    productCategory: '',
    productCode: '',
    productName: '',
  };

export function toProductApplicationQueryParams(
  filters: ProductApplicationSearchFilters,
  pagination?: Pick<BaseApplicationQueryParams, 'pageNo' | 'pageSize' | 'sortKey'>
): ProductApplicationQueryParams {
  const base = toBaseApplicationQueryParams(filters, pagination);
  const specific: Omit<
    ProductApplicationQueryParams,
    keyof BaseApplicationQueryParams
  > = {};

  if (filters.productCategory.trim()) {
    specific.productCategory = filters.productCategory as ProductCategory;
  }
  if (filters.productCode.trim()) specific.productCode = filters.productCode.trim();
  if (filters.productName.trim()) {
    specific.productName = filters.productName.trim();
  }

  return mergeQueryParams(base, specific);
}
