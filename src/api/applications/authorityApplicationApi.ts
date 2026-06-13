import { MOCK_CLIENT_ID } from '../../types/applications/common';
import {
  APPLICATION_TYPE,
  CHANNEL,
  STATUS_BUSINESS,
  STATUS_INTERNAL,
} from '../../types/applications/enums';
import type {
  AuthorityApplication,
  AuthorityApplicationFilters,
} from '../../types/applications/authority';
import {
  delay,
  generateId,
  matchesDate,
  matchesExact,
  matchesText,
} from './mockUtils';

const MOCK_AUTHORITY_APPLICATIONS: AuthorityApplication[] = [
  {
    id: generateId(),
    client_id: MOCK_CLIENT_ID,
    number: 'APP-AUT-0001',
    application_type: APPLICATION_TYPE.AUTHORITY,
    channel: CHANNEL.BRANCH,
    status_internal: STATUS_INTERNAL.NEW,
    status_business: STATUS_BUSINESS.QUEUED,
    reason: '',
    created_date: '2026-05-21T13:25',
    closed_date: null,
    authority_type: 'POA_ACCOUNT_ACCESS',
    person_name: 'Иванов Иван Иванович',
    document_number: '50-АА-1234567',
    valid_until: '2027-05-21',
  },
];

/** GET /api/applications/authorities */
export async function searchAuthorityApplications(
  filters: AuthorityApplicationFilters
): Promise<{ total: number; items: AuthorityApplication[] }> {
  await delay(300);
  const items = MOCK_AUTHORITY_APPLICATIONS.filter(
    (item) =>
      matchesExact(item.status_business, filters.status_business) &&
      matchesText(item.reason, filters.reason) &&
      matchesText(item.number, filters.number) &&
      matchesExact(item.channel, filters.channel) &&
      matchesDate(item.created_date, filters.created_date) &&
      matchesDate(item.closed_date, filters.closed_date) &&
      matchesText(item.authority_type, filters.authority_type) &&
      matchesText(item.person_name, filters.person_name) &&
      matchesText(item.document_number, filters.document_number) &&
      matchesDate(item.valid_until, filters.valid_until)
  );
  return { total: items.length, items };
}

/** POST /api/applications/authorities */
export async function createAuthorityApplication(
  payload: Omit<AuthorityApplication, 'id'>
): Promise<AuthorityApplication> {
  await delay(300);
  const created: AuthorityApplication = { ...payload, id: generateId() };
  MOCK_AUTHORITY_APPLICATIONS.unshift(created);
  return created;
}

/** PUT /api/applications/authorities/{id} */
export async function updateAuthorityApplication(
  id: string,
  payload: Partial<AuthorityApplication>
): Promise<AuthorityApplication> {
  await delay(300);
  const index = MOCK_AUTHORITY_APPLICATIONS.findIndex(
    (item) => item.id === id
  );
  if (index === -1) {
    throw new Error('Заявление не найдено');
  }
  MOCK_AUTHORITY_APPLICATIONS[index] = {
    ...MOCK_AUTHORITY_APPLICATIONS[index],
    ...payload,
    id,
  };
  return MOCK_AUTHORITY_APPLICATIONS[index];
}

/** DELETE /api/applications/authorities/{id} */
export async function deleteAuthorityApplication(id: string): Promise<void> {
  await delay(300);
  const index = MOCK_AUTHORITY_APPLICATIONS.findIndex(
    (item) => item.id === id
  );
  if (index === -1) {
    throw new Error('Заявление не найдено');
  }
  MOCK_AUTHORITY_APPLICATIONS.splice(index, 1);
}
