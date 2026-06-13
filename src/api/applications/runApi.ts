import type { ApplicationType } from '../../types/applications/enums';
import { ENDPOINTS } from '../endpoints';
import { httpPost } from '../httpClient';

export type GeneralCheckRequest = {
  applicationType: ApplicationType;
  /** Верхняя граница даты создания (ISO OffsetDateTime). */
  dateTo: string;
};

export type GeneralCheckResponse = {
  id: string;
  applicationType: ApplicationType;
  dateTo: string;
  processedCount: number;
  statusCounts: Record<string, number>;
};

/** POST /general-check */
export async function runGeneralCheck(
  payload: GeneralCheckRequest
): Promise<GeneralCheckResponse> {
  return httpPost<GeneralCheckResponse>(ENDPOINTS.generalCheck, payload);
}
