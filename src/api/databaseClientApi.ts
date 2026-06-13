import type { BankClient, ClientSearchFilters } from '../types/client';

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const MOCK_CLIENTS: BankClient[] = [
  {
    id: 'client-1',
    lastName: 'Иванова',
    firstName: 'Наталья',
    patronymic: 'Сергеевна',
    birthDate: '15.03.1985',
    gender: 'Женский',
    identityDocumentSeries: '4509',
    identityDocumentNumber: '123456',
    identityDocumentIssueDate: '20.04.2010',
    itn: '770708389301',
    insuranceNumber: '123-456-789 01',
    actualDate: '2026-05-10T14:30:00',
    residenceAddressName: 'г. Москва, ул. Тверская, д. 1',
    status: 'Актуален',
  },
  {
    id: 'client-2',
    lastName: 'Петров',
    firstName: 'Иван',
    patronymic: 'Иванович',
    birthDate: '02.07.1978',
    gender: 'Мужской',
    identityDocumentSeries: '4010',
    identityDocumentNumber: '654321',
    identityDocumentIssueDate: '11.09.2015',
    itn: '500100732259',
    insuranceNumber: '987-654-321 00',
    actualDate: '2026-05-14T09:15:00',
    residenceAddressName: 'г. Санкт-Петербург, Невский пр., д. 10',
    status: 'Актуален',
  },
  {
    id: 'client-3',
    lastName: 'Сидорова',
    firstName: 'Анна',
    patronymic: 'Петровна',
    birthDate: '28.11.1992',
    gender: 'Женский',
    identityDocumentSeries: '6608',
    identityDocumentNumber: '112233',
    identityDocumentIssueDate: '05.01.2018',
    itn: '3664069397',
    insuranceNumber: '111-222-333 44',
    actualDate: '2026-05-15T18:00:00',
    residenceAddressName: 'г. Екатеринбург, ул. Ленина, д. 25',
    status: 'Архив',
  },
];

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function matchesFilter(value: string, filter: string) {
  if (!filter.trim()) {
    return true;
  }
  return normalize(value).includes(normalize(filter));
}

function matchesDatePart(value: string, filter: string) {
  if (!filter.trim()) {
    return true;
  }
  return normalize(value).includes(normalize(filter.replace('T', ' ')));
}

/** GET /api/database/clients/search */
export async function searchClients(
  filters: ClientSearchFilters
): Promise<{ total: number; items: BankClient[] }> {
  await delay(400);

  const items = MOCK_CLIENTS.filter((client) =>
    matchesFilter(client.lastName, filters.lastName) &&
    matchesFilter(client.firstName, filters.firstName) &&
    matchesFilter(client.patronymic, filters.patronymic) &&
    matchesDatePart(client.birthDate, filters.birthDate) &&
    matchesFilter(client.gender, filters.gender) &&
    matchesFilter(client.identityDocumentSeries, filters.identityDocumentSeries) &&
    matchesFilter(client.identityDocumentNumber, filters.identityDocumentNumber) &&
    matchesDatePart(client.identityDocumentIssueDate, filters.identityDocumentIssueDate) &&
    matchesFilter(client.itn, filters.itn) &&
    matchesFilter(client.insuranceNumber, filters.insuranceNumber) &&
    matchesDatePart(client.actualDate, filters.actualDate) &&
    matchesFilter(client.residenceAddressName, filters.residenceAddressName) &&
    matchesFilter(client.status, filters.status)
  );

  return { total: items.length, items };
}

/** DELETE /api/database/clients/{id} */
export async function deleteClient(clientId: string): Promise<void> {
  await delay(400);
  const index = MOCK_CLIENTS.findIndex((client) => client.id === clientId);
  if (index === -1) {
    throw new Error('Клиент не найден');
  }
  MOCK_CLIENTS.splice(index, 1);
}

export function getClientEditPath(clientId: string) {
  return `/database/client-search/${clientId}/edit`;
}
