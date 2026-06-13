import { MOCK_CLIENT_ID } from '../../types/applications/common';
import {
  APPLICATION_TYPE,
  CHANNEL,
  STATUS_BUSINESS,
  STATUS_INTERNAL,
} from '../../types/applications/enums';
import type {
  ServiceApplication,
  ServiceApplicationFilters,
} from '../../types/applications/service';
import {
  delay,
  generateId,
  matchesDate,
  matchesExact,
  matchesText,
} from './mockUtils';

const MOCK_SERVICE_APPLICATIONS: ServiceApplication[] = [
  {
    id: generateId(),
    client_id: MOCK_CLIENT_ID,
    number: 'APP-SRV-0001',
    application_type: APPLICATION_TYPE.SERVICE,
    channel: CHANNEL.MOBILE,
    status_internal: STATUS_INTERNAL.NEW,
    status_business: STATUS_BUSINESS.QUEUED,
    reason: '',
    created_date: '2026-05-22T14:32',
    closed_date: null,
    service_type: 'CARD_SERVICE',
    service_name: 'Перевыпуск карты',
    action_type: 'REQUEST',
  },
  {
    id: generateId(),
    client_id: MOCK_CLIENT_ID,
    number: 'APP-SRV-0002',
    application_type: APPLICATION_TYPE.SERVICE,
    channel: CHANNEL.PHONE,
    status_internal: STATUS_INTERNAL.FAILED,
    status_business: STATUS_BUSINESS.REJECTED,
    reason: 'Не подтверждена личность',
    created_date: '2026-05-15T11:05',
    closed_date: '2026-05-15T18:30',
    service_type: 'SMS_INFO',
    service_name: 'SMS-информирование',
    action_type: 'DISABLE',
  },
];

/** GET /api/applications/services */
export async function searchServiceApplications(
  filters: ServiceApplicationFilters
): Promise<{ total: number; items: ServiceApplication[] }> {
  await delay(300);
  const items = MOCK_SERVICE_APPLICATIONS.filter(
    (item) =>
      matchesExact(item.status_business, filters.status_business) &&
      matchesText(item.reason, filters.reason) &&
      matchesText(item.number, filters.number) &&
      matchesExact(item.channel, filters.channel) &&
      matchesDate(item.created_date, filters.created_date) &&
      matchesDate(item.closed_date, filters.closed_date) &&
      matchesText(item.service_type, filters.service_type) &&
      matchesText(item.service_name, filters.service_name) &&
      matchesText(item.action_type, filters.action_type)
  );
  return { total: items.length, items };
}

/** POST /api/applications/services */
export async function createServiceApplication(
  payload: Omit<ServiceApplication, 'id'>
): Promise<ServiceApplication> {
  await delay(300);
  const created: ServiceApplication = { ...payload, id: generateId() };
  MOCK_SERVICE_APPLICATIONS.unshift(created);
  return created;
}

/** PUT /api/applications/services/{id} */
export async function updateServiceApplication(
  id: string,
  payload: Partial<ServiceApplication>
): Promise<ServiceApplication> {
  await delay(300);
  const index = MOCK_SERVICE_APPLICATIONS.findIndex((item) => item.id === id);
  if (index === -1) {
    throw new Error('Заявление не найдено');
  }
  MOCK_SERVICE_APPLICATIONS[index] = {
    ...MOCK_SERVICE_APPLICATIONS[index],
    ...payload,
    id,
  };
  return MOCK_SERVICE_APPLICATIONS[index];
}

/** DELETE /api/applications/services/{id} */
export async function deleteServiceApplication(id: string): Promise<void> {
  await delay(300);
  const index = MOCK_SERVICE_APPLICATIONS.findIndex((item) => item.id === id);
  if (index === -1) {
    throw new Error('Заявление не найдено');
  }
  MOCK_SERVICE_APPLICATIONS.splice(index, 1);
}
