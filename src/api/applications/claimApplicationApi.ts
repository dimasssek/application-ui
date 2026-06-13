import { ENDPOINTS } from '../endpoints';
import type {
  ClaimApplication,
  ClaimApplicationCreateRequest,
  ClaimApplicationQueryParams,
  ClaimApplicationUpdateRequest,
} from '../../types/applications/claim';
import { createApplicationApi } from './applicationApiFactory';

const api = createApplicationApi<
  ClaimApplication,
  ClaimApplicationCreateRequest,
  ClaimApplicationUpdateRequest,
  ClaimApplicationQueryParams
>(ENDPOINTS.claim);

export const searchClaimApplications = api.search;
export const getClaimApplication = api.getById;
export const createClaimApplication = api.create;
export const updateClaimApplication = api.update;
export const deleteClaimApplication = api.delete;
