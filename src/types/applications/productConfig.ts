import {
  createProductApplication,
  deleteProductApplication,
  searchProductApplications,
  updateProductApplication,
} from '../../api/applications/productApplicationApi';
import { ROUTES } from '../../navigation/routes';
import { MOCK_CLIENT_ID } from './common';
import { APPLICATION_TYPE } from './enums';
import {
  EMPTY_PRODUCT_APPLICATION_FILTERS,
  type ProductApplication,
  type ProductApplicationFilters,
} from './product';
import {
  buildCommonDefaults,
  COMMON_COLUMNS,
  COMMON_FILTER_FIELDS,
  COMMON_FORM_FIELDS,
  CURRENCY_FIELD,
  type ApplicationConfig,
  type ColumnConfig,
  type FieldConfig,
} from './registry';

const PRODUCT_FILTER_FIELDS: FieldConfig<keyof ProductApplicationFilters & string>[] =
  [
    ...(COMMON_FILTER_FIELDS as FieldConfig<keyof ProductApplicationFilters & string>[]),
    {
      key: 'product_name',
      label: 'Продукт',
      type: 'text',
      gridSize: { xs: 12, md: 4 },
    },
    {
      key: 'product_category',
      label: 'Категория',
      type: 'text',
      gridSize: { xs: 12, md: 4 },
    },
    {
      key: 'product_code',
      label: 'Код продукта',
      type: 'text',
      gridSize: { xs: 12, md: 4 },
    },
    {
      key: 'currency',
      label: 'Валюта',
      type: 'select',
      options: CURRENCY_FIELD.options,
      labels: CURRENCY_FIELD.labels,
      gridSize: { xs: 12, md: 3 },
    },
    {
      key: 'amount',
      label: 'Сумма',
      type: 'text',
      gridSize: { xs: 12, md: 3 },
    },
    {
      key: 'term_months',
      label: 'Срок, мес',
      type: 'text',
      gridSize: { xs: 12, md: 3 },
    },
    {
      key: 'tariff_code',
      label: 'Тариф',
      type: 'text',
      gridSize: { xs: 12, md: 3 },
    },
    {
      key: 'purpose',
      label: 'Назначение',
      type: 'text',
      gridSize: { xs: 12, md: 6 },
    },
    {
      key: 'external_product_id',
      label: 'Внешний ID',
      type: 'text',
      gridSize: { xs: 12, md: 6 },
    },
  ];

const PRODUCT_COLUMNS: ColumnConfig<keyof ProductApplication & string>[] = [
  ...(COMMON_COLUMNS as ColumnConfig<keyof ProductApplication & string>[]),
  { key: 'product_name', label: 'Продукт', minWidth: 200 },
  { key: 'product_category', label: 'Категория', minWidth: 140 },
  {
    key: 'currency',
    label: 'Валюта',
    minWidth: 90,
    labels: CURRENCY_FIELD.labels,
  },
  { key: 'amount', label: 'Сумма', minWidth: 120 },
  { key: 'term_months', label: 'Срок, мес', minWidth: 110 },
];

const PRODUCT_FORM_FIELDS: FieldConfig<keyof ProductApplication & string>[] = [
  ...(COMMON_FORM_FIELDS as FieldConfig<keyof ProductApplication & string>[]),
  {
    key: 'product_category',
    label: 'Категория',
    type: 'text',
    required: true,
    gridSize: { xs: 12, md: 6 },
  },
  {
    key: 'product_code',
    label: 'Код продукта',
    type: 'text',
    required: true,
    gridSize: { xs: 12, md: 6 },
  },
  {
    key: 'product_name',
    label: 'Название продукта',
    type: 'text',
    required: true,
    gridSize: { xs: 12, md: 12 },
  },
  {
    key: 'currency',
    label: 'Валюта',
    type: 'select',
    options: CURRENCY_FIELD.options,
    labels: CURRENCY_FIELD.labels,
    required: true,
    gridSize: { xs: 12, md: 3 },
  },
  {
    key: 'amount',
    label: 'Сумма',
    type: 'text',
    required: true,
    gridSize: { xs: 12, md: 3 },
  },
  {
    key: 'term_months',
    label: 'Срок, мес',
    type: 'text',
    gridSize: { xs: 12, md: 3 },
  },
  {
    key: 'tariff_code',
    label: 'Код тарифа',
    type: 'text',
    gridSize: { xs: 12, md: 3 },
  },
  {
    key: 'purpose',
    label: 'Назначение',
    type: 'text',
    gridSize: { xs: 12, md: 6 },
  },
  {
    key: 'external_product_id',
    label: 'Внешний ID',
    type: 'text',
    gridSize: { xs: 12, md: 6 },
  },
];

export const PRODUCT_APPLICATION_CONFIG: ApplicationConfig<
  ProductApplication,
  ProductApplicationFilters
> = {
  title: 'Заявления на банковский продукт',
  description:
    'Список заявлений на оформление кредитов, вкладов, карт и других банковских продуктов.',
  path: ROUTES.applicationsProducts,
  applicationTypeCode: APPLICATION_TYPE.PRODUCT,
  emptyFilters: EMPTY_PRODUCT_APPLICATION_FILTERS,
  filterFields: PRODUCT_FILTER_FIELDS,
  columns: PRODUCT_COLUMNS,
  formFields: PRODUCT_FORM_FIELDS,
  buildDefaults: () => ({
    ...buildCommonDefaults(APPLICATION_TYPE.PRODUCT),
    client_id: MOCK_CLIENT_ID,
    product_category: '',
    product_code: '',
    product_name: '',
    currency: '',
    amount: '',
    term_months: '',
    purpose: '',
    tariff_code: '',
    external_product_id: '',
  }),
  api: {
    search: searchProductApplications,
    create: createProductApplication,
    update: updateProductApplication,
    delete: deleteProductApplication,
  },
};
