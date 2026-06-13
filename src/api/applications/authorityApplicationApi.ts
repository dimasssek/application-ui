import { ENDPOINTS } from '../endpoints';
import type {
  AuthorityApplication,
  AuthorityApplicationCreateRequest,
  AuthorityApplicationQueryParams,
  AuthorityApplicationUpdateRequest,
} from '../../types/applications/authority';
import { createApplicationApi } from './applicationApiFactory';

const api = createApplicationApi<
  AuthorityApplication,
  AuthorityApplicationCreateRequest,
  AuthorityApplicationUpdateRequest,
  AuthorityApplicationQueryParams
>(ENDPOINTS.authority);

export const searchAuthorityApplications = api.search;
export const getAuthorityApplication = api.getById;
export const createAuthorityApplication = api.create;
export const updateAuthorityApplication = api.update;
export const deleteAuthorityApplication = api.delete;
