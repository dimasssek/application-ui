import { ENDPOINTS } from '../endpoints';
import type {
  DocumentApplication,
  DocumentApplicationCreateRequest,
  DocumentApplicationQueryParams,
  DocumentApplicationUpdateRequest,
} from '../../types/applications/document';
import { createApplicationApi } from './applicationApiFactory';

const api = createApplicationApi<
  DocumentApplication,
  DocumentApplicationCreateRequest,
  DocumentApplicationUpdateRequest,
  DocumentApplicationQueryParams
>(ENDPOINTS.document);

export const searchDocumentApplications = api.search;
export const getDocumentApplication = api.getById;
export const createDocumentApplication = api.create;
export const updateDocumentApplication = api.update;
export const deleteDocumentApplication = api.delete;
