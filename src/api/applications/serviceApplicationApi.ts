import { ENDPOINTS } from '../endpoints';
import type {
  ServiceApplication,
  ServiceApplicationCreateRequest,
  ServiceApplicationQueryParams,
  ServiceApplicationUpdateRequest,
} from '../../types/applications/service';
import { createApplicationApi } from './applicationApiFactory';

const api = createApplicationApi<
  ServiceApplication,
  ServiceApplicationCreateRequest,
  ServiceApplicationUpdateRequest,
  ServiceApplicationQueryParams
>(ENDPOINTS.service);

export const searchServiceApplications = api.search;
export const getServiceApplication = api.getById;
export const createServiceApplication = api.create;
export const updateServiceApplication = api.update;
export const deleteServiceApplication = api.delete;
