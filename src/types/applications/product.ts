/**
 * Заявление на банковский продукт.
 * Поля общей части (application) + поля product_application.
 */
export type ProductApplication = {
  id: string;
  client_id: string;
  number: string;
  application_type: string;
  channel: string;
  status_internal: string;
  status_business: string;
  reason: string;
  created_date: string;
  closed_date: string | null;

  product_category: string;
  product_code: string;
  product_name: string;
  currency: string;
  amount: string;
  term_months: string;
  purpose: string;
  tariff_code: string;
  external_product_id: string;
};

export type ProductApplicationFilters = {
  status_business: string;
  reason: string;
  number: string;
  channel: string;
  created_date: string;
  closed_date: string;

  product_category: string;
  product_code: string;
  product_name: string;
  currency: string;
  amount: string;
  term_months: string;
  purpose: string;
  tariff_code: string;
  external_product_id: string;
};

export const EMPTY_PRODUCT_APPLICATION_FILTERS: ProductApplicationFilters = {
  status_business: '',
  reason: '',
  number: '',
  channel: '',
  created_date: '',
  closed_date: '',

  product_category: '',
  product_code: '',
  product_name: '',
  currency: '',
  amount: '',
  term_months: '',
  purpose: '',
  tariff_code: '',
  external_product_id: '',
};
