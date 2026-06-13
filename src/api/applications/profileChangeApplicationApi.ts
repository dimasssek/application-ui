import { ENDPOINTS } from '../endpoints';
import type {
  ProfileChangeApplication,
  ProfileChangeApplicationCreateRequest,
  ProfileChangeApplicationQueryParams,
  ProfileChangeApplicationUpdateRequest,
} from '../../types/applications/profileChange';
import { createApplicationApi } from './applicationApiFactory';

const api = createApplicationApi<
  ProfileChangeApplication,
  ProfileChangeApplicationCreateRequest,
  ProfileChangeApplicationUpdateRequest,
  ProfileChangeApplicationQueryParams
>(ENDPOINTS.profileChange);

export const searchProfileChangeApplications = api.search;
export const getProfileChangeApplication = api.getById;
export const createProfileChangeApplication = api.create;
export const updateProfileChangeApplication = api.update;
export const deleteProfileChangeApplication = api.delete;
