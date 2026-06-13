import { ENDPOINTS } from '../endpoints';
import type {
  ProductApplication,
  ProductApplicationCreateRequest,
  ProductApplicationQueryParams,
  ProductApplicationUpdateRequest,
} from '../../types/applications/product';
import { createApplicationApi } from './applicationApiFactory';

const api = createApplicationApi<
  ProductApplication,
  ProductApplicationCreateRequest,
  ProductApplicationUpdateRequest,
  ProductApplicationQueryParams
>(ENDPOINTS.product);

export const searchProductApplications = api.search;
export const getProductApplication = api.getById;
export const createProductApplication = api.create;
export const updateProductApplication = api.update;
export const deleteProductApplication = api.delete;
