import { MOCK_CLIENT_ID } from '../../types/applications/common';
import {
  APPLICATION_TYPE,
  CHANNEL,
  CURRENCY,
  STATUS_BUSINESS,
  STATUS_INTERNAL,
} from '../../types/applications/enums';
import type {
  ProductApplication,
  ProductApplicationFilters,
} from '../../types/applications/product';
import {
  delay,
  generateId,
  matchesDate,
  matchesExact,
  matchesText,
} from './mockUtils';

const MOCK_PRODUCT_APPLICATIONS: ProductApplication[] = [
  {
    id: generateId(),
    client_id: MOCK_CLIENT_ID,
    number: 'APP-PROD-0001',
    application_type: APPLICATION_TYPE.PRODUCT,
    channel: CHANNEL.ONLINE,
    status_internal: STATUS_INTERNAL.NEW,
    status_business: STATUS_BUSINESS.QUEUED,
    reason: 'Ожидает обработки оператором',
    created_date: '2026-05-20T10:15',
    closed_date: null,
    product_category: 'CREDIT',
    product_code: 'CR-001',
    product_name: 'Потребительский кредит',
    currency: CURRENCY.RUB,
    amount: '500000',
    term_months: '24',
    purpose: 'Покупка автомобиля',
    tariff_code: 'TARIFF-RETAIL-A',
    external_product_id: 'EXT-555-001',
  },
  {
    id: generateId(),
    client_id: MOCK_CLIENT_ID,
    number: 'APP-PROD-0002',
    application_type: APPLICATION_TYPE.PRODUCT,
    channel: CHANNEL.BRANCH,
    status_internal: STATUS_INTERNAL.READY,
    status_business: STATUS_BUSINESS.IN_PROGRESS,
    reason: 'Запрошена дополнительная справка',
    created_date: '2026-05-18T09:00',
    closed_date: null,
    product_category: 'DEPOSIT',
    product_code: 'DEP-100',
    product_name: 'Вклад «Удобный»',
    currency: CURRENCY.RUB,
    amount: '1200000',
    term_months: '12',
    purpose: 'Накопление',
    tariff_code: 'TARIFF-DEP-12',
    external_product_id: 'EXT-555-002',
  },
];

/** GET /api/applications/products */
export async function searchProductApplications(
  filters: ProductApplicationFilters
): Promise<{ total: number; items: ProductApplication[] }> {
  await delay(300);
  const items = MOCK_PRODUCT_APPLICATIONS.filter(
    (item) =>
      matchesExact(item.status_business, filters.status_business) &&
      matchesText(item.reason, filters.reason) &&
      matchesText(item.number, filters.number) &&
      matchesExact(item.channel, filters.channel) &&
      matchesDate(item.created_date, filters.created_date) &&
      matchesDate(item.closed_date, filters.closed_date) &&
      matchesText(item.product_category, filters.product_category) &&
      matchesText(item.product_code, filters.product_code) &&
      matchesText(item.product_name, filters.product_name) &&
      matchesExact(item.currency, filters.currency) &&
      matchesText(item.amount, filters.amount) &&
      matchesText(item.term_months, filters.term_months) &&
      matchesText(item.purpose, filters.purpose) &&
      matchesText(item.tariff_code, filters.tariff_code) &&
      matchesText(item.external_product_id, filters.external_product_id)
  );
  return { total: items.length, items };
}

/** POST /api/applications/products */
export async function createProductApplication(
  payload: Omit<ProductApplication, 'id'>
): Promise<ProductApplication> {
  await delay(300);
  const created: ProductApplication = { ...payload, id: generateId() };
  MOCK_PRODUCT_APPLICATIONS.unshift(created);
  return created;
}

/** PUT /api/applications/products/{id} */
export async function updateProductApplication(
  id: string,
  payload: Partial<ProductApplication>
): Promise<ProductApplication> {
  await delay(300);
  const index = MOCK_PRODUCT_APPLICATIONS.findIndex((item) => item.id === id);
  if (index === -1) {
    throw new Error('Заявление не найдено');
  }
  MOCK_PRODUCT_APPLICATIONS[index] = {
    ...MOCK_PRODUCT_APPLICATIONS[index],
    ...payload,
    id,
  };
  return MOCK_PRODUCT_APPLICATIONS[index];
}

/** DELETE /api/applications/products/{id} */
export async function deleteProductApplication(id: string): Promise<void> {
  await delay(300);
  const index = MOCK_PRODUCT_APPLICATIONS.findIndex((item) => item.id === id);
  if (index === -1) {
    throw new Error('Заявление не найдено');
  }
  MOCK_PRODUCT_APPLICATIONS.splice(index, 1);
}
