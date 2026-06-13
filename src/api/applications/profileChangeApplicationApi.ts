import { MOCK_CLIENT_ID } from '../../types/applications/common';
import {
  APPLICATION_TYPE,
  CHANNEL,
  STATUS_BUSINESS,
  STATUS_INTERNAL,
} from '../../types/applications/enums';
import type {
  ProfileChangeApplication,
  ProfileChangeApplicationFilters,
} from '../../types/applications/profileChange';
import {
  delay,
  generateId,
  matchesDate,
  matchesExact,
  matchesText,
} from './mockUtils';

const MOCK_PROFILE_CHANGE_APPLICATIONS: ProfileChangeApplication[] = [
  {
    id: generateId(),
    client_id: MOCK_CLIENT_ID,
    number: 'APP-PCH-0001',
    application_type: APPLICATION_TYPE.PROFILE_CHANGE,
    channel: CHANNEL.BRANCH,
    status_internal: STATUS_INTERNAL.NEW,
    status_business: STATUS_BUSINESS.QUEUED,
    reason: '',
    created_date: '2026-05-23T09:40',
    closed_date: null,
    change_type: 'ADDRESS',
    old_value: 'г. Москва, ул. Тверская, д. 1',
    new_value: 'г. Москва, Ленинский пр-т, д. 25',
  },
];

/** GET /api/applications/profile-changes */
export async function searchProfileChangeApplications(
  filters: ProfileChangeApplicationFilters
): Promise<{ total: number; items: ProfileChangeApplication[] }> {
  await delay(300);
  const items = MOCK_PROFILE_CHANGE_APPLICATIONS.filter(
    (item) =>
      matchesExact(item.status_business, filters.status_business) &&
      matchesText(item.reason, filters.reason) &&
      matchesText(item.number, filters.number) &&
      matchesExact(item.channel, filters.channel) &&
      matchesDate(item.created_date, filters.created_date) &&
      matchesDate(item.closed_date, filters.closed_date) &&
      matchesText(item.change_type, filters.change_type) &&
      matchesText(item.old_value, filters.old_value) &&
      matchesText(item.new_value, filters.new_value)
  );
  return { total: items.length, items };
}

/** POST /api/applications/profile-changes */
export async function createProfileChangeApplication(
  payload: Omit<ProfileChangeApplication, 'id'>
): Promise<ProfileChangeApplication> {
  await delay(300);
  const created: ProfileChangeApplication = { ...payload, id: generateId() };
  MOCK_PROFILE_CHANGE_APPLICATIONS.unshift(created);
  return created;
}

/** PUT /api/applications/profile-changes/{id} */
export async function updateProfileChangeApplication(
  id: string,
  payload: Partial<ProfileChangeApplication>
): Promise<ProfileChangeApplication> {
  await delay(300);
  const index = MOCK_PROFILE_CHANGE_APPLICATIONS.findIndex(
    (item) => item.id === id
  );
  if (index === -1) {
    throw new Error('Заявление не найдено');
  }
  MOCK_PROFILE_CHANGE_APPLICATIONS[index] = {
    ...MOCK_PROFILE_CHANGE_APPLICATIONS[index],
    ...payload,
    id,
  };
  return MOCK_PROFILE_CHANGE_APPLICATIONS[index];
}

/** DELETE /api/applications/profile-changes/{id} */
export async function deleteProfileChangeApplication(
  id: string
): Promise<void> {
  await delay(300);
  const index = MOCK_PROFILE_CHANGE_APPLICATIONS.findIndex(
    (item) => item.id === id
  );
  if (index === -1) {
    throw new Error('Заявление не найдено');
  }
  MOCK_PROFILE_CHANGE_APPLICATIONS.splice(index, 1);
}
