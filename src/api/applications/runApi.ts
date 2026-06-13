import { delay } from './mockUtils';

export type RunProcessingPayload = {
  date: string;
  application_type: string;
};

/**
 * POST /api/applications/processing/run
 * Пока заглушка: ничего не делает, кроме логирования.
 */
export async function runApplicationsProcessing(
  payload: RunProcessingPayload
): Promise<void> {
  await delay(500);
  // eslint-disable-next-line no-console
  console.info('runApplicationsProcessing (stub)', payload);
}
