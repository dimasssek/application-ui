import { ENDPOINTS } from './endpoints';
import { httpGet, httpPost } from './httpClient';
import type { PageData } from '../types/common/page';
import type {
  BatchRequestTo,
  ExternalRequestBatchCreateRequest,
  ExternalRequestListTo,
  ExternalRequestManualCreateRequest,
  ExternalRequestQueryParams,
  ExternalRequestTo,
  RequestTo,
} from '../types/externalRequest';

/** POST /api/v1/external-requests/search */
export async function searchExternalRequests(
  params: ExternalRequestQueryParams
): Promise<PageData<ExternalRequestListTo>> {
  return httpPost<PageData<ExternalRequestListTo>>(
    `${ENDPOINTS.externalRequests}/search`,
    params
  );
}

/** GET /api/v1/external-requests/{id} */
export async function getExternalRequest(id: string): Promise<ExternalRequestTo> {
  return httpGet<ExternalRequestTo>(`${ENDPOINTS.externalRequests}/${id}`);
}

/** GET /api/v1/external-requests/{id}/batches */
export async function getExternalRequestBatches(
  id: string
): Promise<BatchRequestTo[]> {
  return httpGet<BatchRequestTo[]>(
    `${ENDPOINTS.externalRequests}/${id}/batches`
  );
}

/** POST /api/v1/external-requests/batch */
export async function createExternalRequestBatch(
  payload: ExternalRequestBatchCreateRequest
): Promise<ExternalRequestTo> {
  return httpPost<ExternalRequestTo>(
    `${ENDPOINTS.externalRequests}/batch`,
    payload
  );
}

/** POST /api/v1/external-requests/manual */
export async function createExternalRequestManual(
  payload: ExternalRequestManualCreateRequest
): Promise<ExternalRequestTo> {
  return httpPost<ExternalRequestTo>(
    `${ENDPOINTS.externalRequests}/manual`,
    payload
  );
}

/** GET /api/v1/batch-requests/{id}/requests */
export async function getBatchRequests(
  batchId: string
): Promise<RequestTo[]> {
  return httpGet<RequestTo[]>(`${ENDPOINTS.batchRequests}/${batchId}/requests`);
}

export function getExternalRequestDetailPath(requestId: string) {
  return `/database/interagency/${requestId}`;
}
