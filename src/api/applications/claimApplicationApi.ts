import { MOCK_CLIENT_ID } from '../../types/applications/common';
import {
  APPLICATION_TYPE,
  CHANNEL,
  STATUS_BUSINESS,
  STATUS_INTERNAL,
} from '../../types/applications/enums';
import type {
  ClaimApplication,
  ClaimApplicationFilters,
} from '../../types/applications/claim';
import {
  delay,
  generateId,
  matchesDate,
  matchesExact,
  matchesText,
} from './mockUtils';

const MOCK_CLAIM_APPLICATIONS: ClaimApplication[] = [
  {
    id: generateId(),
    client_id: MOCK_CLIENT_ID,
    number: 'APP-CLM-0001',
    application_type: APPLICATION_TYPE.CLAIM,
    channel: CHANNEL.PHONE,
    status_internal: STATUS_INTERNAL.NEW,
    status_business: STATUS_BUSINESS.QUEUED,
    reason: '',
    created_date: '2026-05-19T17:10',
    closed_date: null,
    claim_type: 'TRANSACTION_DISPUTE',
    claim_subject: 'Несогласие с операцией',
    description: 'Клиент оспаривает списание от 15.05.2026',
    external_ref: 'TX-882-661-001',
  },
];

/** GET /api/applications/claims */
export async function searchClaimApplications(
  filters: ClaimApplicationFilters
): Promise<{ total: number; items: ClaimApplication[] }> {
  await delay(300);
  const items = MOCK_CLAIM_APPLICATIONS.filter(
    (item) =>
      matchesExact(item.status_business, filters.status_business) &&
      matchesText(item.reason, filters.reason) &&
      matchesText(item.number, filters.number) &&
      matchesExact(item.channel, filters.channel) &&
      matchesDate(item.created_date, filters.created_date) &&
      matchesDate(item.closed_date, filters.closed_date) &&
      matchesText(item.claim_type, filters.claim_type) &&
      matchesText(item.claim_subject, filters.claim_subject) &&
      matchesText(item.description, filters.description) &&
      matchesText(item.external_ref, filters.external_ref)
  );
  return { total: items.length, items };
}

/** POST /api/applications/claims */
export async function createClaimApplication(
  payload: Omit<ClaimApplication, 'id'>
): Promise<ClaimApplication> {
  await delay(300);
  const created: ClaimApplication = { ...payload, id: generateId() };
  MOCK_CLAIM_APPLICATIONS.unshift(created);
  return created;
}

/** PUT /api/applications/claims/{id} */
export async function updateClaimApplication(
  id: string,
  payload: Partial<ClaimApplication>
): Promise<ClaimApplication> {
  await delay(300);
  const index = MOCK_CLAIM_APPLICATIONS.findIndex((item) => item.id === id);
  if (index === -1) {
    throw new Error('Заявление не найдено');
  }
  MOCK_CLAIM_APPLICATIONS[index] = {
    ...MOCK_CLAIM_APPLICATIONS[index],
    ...payload,
    id,
  };
  return MOCK_CLAIM_APPLICATIONS[index];
}

/** DELETE /api/applications/claims/{id} */
export async function deleteClaimApplication(id: string): Promise<void> {
  await delay(300);
  const index = MOCK_CLAIM_APPLICATIONS.findIndex((item) => item.id === id);
  if (index === -1) {
    throw new Error('Заявление не найдено');
  }
  MOCK_CLAIM_APPLICATIONS.splice(index, 1);
}
