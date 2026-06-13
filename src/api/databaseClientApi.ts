import { ENDPOINTS } from './endpoints';
import {
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
} from './httpClient';
import type { PageData } from '../types/common/page';
import type {
  ClientCreateRequest,
  ClientHistoryEntryTo,
  ClientQueryParams,
  ClientTo,
  ClientUpdateRequest,
} from '../types/client';

/** POST /api/v1/clients/search */
export async function searchClients(
  params: ClientQueryParams
): Promise<PageData<ClientTo>> {
  return httpPost<PageData<ClientTo>>(`${ENDPOINTS.clients}/search`, params);
}

/** GET /api/v1/clients/{id} */
export async function getClient(id: string): Promise<ClientTo> {
  return httpGet<ClientTo>(`${ENDPOINTS.clients}/${id}`);
}

/** POST /api/v1/clients */
export async function createClient(
  payload: ClientCreateRequest
): Promise<ClientTo> {
  return httpPost<ClientTo>(ENDPOINTS.clients, payload);
}

/** PUT /api/v1/clients/{id} */
export async function updateClient(
  id: string,
  payload: ClientUpdateRequest
): Promise<ClientTo> {
  return httpPut<ClientTo>(`${ENDPOINTS.clients}/${id}`, payload);
}

/** DELETE /api/v1/clients/{id} */
export async function deleteClient(id: string): Promise<void> {
  return httpDelete(`${ENDPOINTS.clients}/${id}`);
}

/** GET /api/v1/clients/{id}/history */
export async function getClientHistory(
  id: string
): Promise<ClientHistoryEntryTo[]> {
  return httpGet<ClientHistoryEntryTo[]>(`${ENDPOINTS.clients}/${id}/history`);
}

export function getClientEditPath(clientId: string) {
  return `/database/client-search/${clientId}/edit`;
}
