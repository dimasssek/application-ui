import { MOCK_CLIENT_ID } from '../../types/applications/common';
import {
  APPLICATION_TYPE,
  CHANNEL,
  STATUS_BUSINESS,
  STATUS_INTERNAL,
} from '../../types/applications/enums';
import type {
  DocumentApplication,
  DocumentApplicationFilters,
} from '../../types/applications/document';
import {
  delay,
  generateId,
  matchesDate,
  matchesExact,
  matchesText,
} from './mockUtils';

const MOCK_DOCUMENT_APPLICATIONS: DocumentApplication[] = [
  {
    id: generateId(),
    client_id: MOCK_CLIENT_ID,
    number: 'APP-DOC-0001',
    application_type: APPLICATION_TYPE.DOCUMENT,
    channel: CHANNEL.ONLINE,
    status_internal: STATUS_INTERNAL.NEW,
    status_business: STATUS_BUSINESS.QUEUED,
    reason: '',
    created_date: '2026-05-24T15:00',
    closed_date: null,
    document_type: 'ACCOUNT_STATEMENT',
    delivery_type: 'EMAIL',
    purpose: 'Подача в налоговую',
  },
];

/** GET /api/applications/documents */
export async function searchDocumentApplications(
  filters: DocumentApplicationFilters
): Promise<{ total: number; items: DocumentApplication[] }> {
  await delay(300);
  const items = MOCK_DOCUMENT_APPLICATIONS.filter(
    (item) =>
      matchesExact(item.status_business, filters.status_business) &&
      matchesText(item.reason, filters.reason) &&
      matchesText(item.number, filters.number) &&
      matchesExact(item.channel, filters.channel) &&
      matchesDate(item.created_date, filters.created_date) &&
      matchesDate(item.closed_date, filters.closed_date) &&
      matchesText(item.document_type, filters.document_type) &&
      matchesText(item.delivery_type, filters.delivery_type) &&
      matchesText(item.purpose, filters.purpose)
  );
  return { total: items.length, items };
}

/** POST /api/applications/documents */
export async function createDocumentApplication(
  payload: Omit<DocumentApplication, 'id'>
): Promise<DocumentApplication> {
  await delay(300);
  const created: DocumentApplication = { ...payload, id: generateId() };
  MOCK_DOCUMENT_APPLICATIONS.unshift(created);
  return created;
}

/** PUT /api/applications/documents/{id} */
export async function updateDocumentApplication(
  id: string,
  payload: Partial<DocumentApplication>
): Promise<DocumentApplication> {
  await delay(300);
  const index = MOCK_DOCUMENT_APPLICATIONS.findIndex((item) => item.id === id);
  if (index === -1) {
    throw new Error('Заявление не найдено');
  }
  MOCK_DOCUMENT_APPLICATIONS[index] = {
    ...MOCK_DOCUMENT_APPLICATIONS[index],
    ...payload,
    id,
  };
  return MOCK_DOCUMENT_APPLICATIONS[index];
}

/** DELETE /api/applications/documents/{id} */
export async function deleteDocumentApplication(id: string): Promise<void> {
  await delay(300);
  const index = MOCK_DOCUMENT_APPLICATIONS.findIndex((item) => item.id === id);
  if (index === -1) {
    throw new Error('Заявление не найдено');
  }
  MOCK_DOCUMENT_APPLICATIONS.splice(index, 1);
}
