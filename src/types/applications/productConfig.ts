import {
  createProductApplication,
  deleteProductApplication,
  searchProductApplications,
  updateProductApplication,
} from '../../api/applications/productApplicationApi';
import { ROUTES } from '../../navigation/routes';
import { APPLICATION_TYPE } from './enums';
import {
  EMPTY_PRODUCT_APPLICATION_SEARCH_FILTERS,
  type ProductApplication,
  type ProductApplicationCreateRequest,
  type ProductApplicationQueryParams,
  type ProductApplicationSearchFilters,
  type ProductApplicationUpdateRequest,
  toProductApplicationQueryParams,
} from './product';
import {
  buildClientFormDefaults,
  COMMON_COLUMNS,
  COMMON_FILTER_FIELDS,
  COMMON_FORM_FIELDS,
  PRODUCT_CATEGORY_LABELS,
  PRODUCT_CATEGORY_OPTIONS,
  type ApplicationConfig,
  type ColumnConfig,
  type FieldConfig,
} from './registry';

const PRODUCT_FILTER_FIELDS: FieldConfig<
  keyof ProductApplicationSearchFilters & string
>[] = [
  ...(COMMON_FILTER_FIELDS as FieldConfig<
    keyof ProductApplicationSearchFilters & string
  >[]),
  {
    key: 'productCategory',
    label: 'Категория',
    type: 'select',
    options: PRODUCT_CATEGORY_OPTIONS,
    labels: PRODUCT_CATEGORY_LABELS,
    gridSize: { xs: 12, md: 4 },
  },
  {
    key: 'productCode',
    label: 'Код продукта',
    type: 'text',
    gridSize: { xs: 12, md: 4 },
  },
  {
    key: 'productName',
    label: 'Продукт',
    type: 'text',
    gridSize: { xs: 12, md: 4 },
  },
];

const PRODUCT_COLUMNS: ColumnConfig<keyof ProductApplication & string>[] = [
  ...(COMMON_COLUMNS as ColumnConfig<keyof ProductApplication & string>[]),
  {
    key: 'productCategory',
    label: 'Категория',
    minWidth: 140,
    labels: PRODUCT_CATEGORY_LABELS,
  },
  { key: 'productName', label: 'Продукт', minWidth: 200 },
  { key: 'amount', label: 'Сумма', minWidth: 120 },
  { key: 'termMonths', label: 'Срок, мес', minWidth: 110 },
];

const PRODUCT_FORM_FIELDS: FieldConfig<keyof ProductApplication & string>[] = [
  ...(COMMON_FORM_FIELDS as FieldConfig<keyof ProductApplication & string>[]),
  {
    key: 'productCategory',
    label: 'Категория',
    type: 'select',
    options: PRODUCT_CATEGORY_OPTIONS,
    labels: PRODUCT_CATEGORY_LABELS,
    required: true,
    gridSize: { xs: 12, md: 6 },
  },
  {
    key: 'productCode',
    label: 'Код продукта',
    type: 'text',
    gridSize: { xs: 12, md: 6 },
  },
  {
    key: 'productName',
    label: 'Название продукта',
    type: 'text',
    required: true,
    gridSize: { xs: 12, md: 12 },
  },
  {
    key: 'amount',
    label: 'Сумма',
    type: 'number',
    gridSize: { xs: 12, md: 4 },
  },
  {
    key: 'termMonths',
    label: 'Срок, мес',
    type: 'number',
    gridSize: { xs: 12, md: 4 },
  },
  {
    key: 'tariffCode',
    label: 'Код тарифа',
    type: 'text',
    gridSize: { xs: 12, md: 4 },
  },
  {
    key: 'purpose',
    label: 'Назначение',
    type: 'text',
    gridSize: { xs: 12, md: 6 },
  },
  {
    key: 'externalProductId',
    label: 'Внешний ID',
    type: 'text',
    gridSize: { xs: 12, md: 6 },
  },
];

export const PRODUCT_APPLICATION_CONFIG: ApplicationConfig<
  ProductApplication,
  ProductApplicationSearchFilters,
  ProductApplicationQueryParams,
  ProductApplicationCreateRequest,
  ProductApplicationUpdateRequest
> = {
  title: 'Заявления на банковский продукт',
  description:
    'Список заявлений на оформление кредитов, вкладов, карт и других банковских продуктов.',
  path: ROUTES.applicationsProducts,
  applicationTypeCode: APPLICATION_TYPE.PRODUCT,
  emptyFilters: EMPTY_PRODUCT_APPLICATION_SEARCH_FILTERS,
  filterFields: PRODUCT_FILTER_FIELDS,
  columns: PRODUCT_COLUMNS,
  formFields: PRODUCT_FORM_FIELDS,
  buildDefaults: () => ({
    ...buildClientFormDefaults(),
    productCategory: '',
    productCode: '',
    productName: '',
    amount: '',
    termMonths: '',
    purpose: '',
    tariffCode: '',
    externalProductId: '',
  }),
  toQueryParams: toProductApplicationQueryParams,
  api: {
    search: searchProductApplications,
    create: createProductApplication,
    update: updateProductApplication,
    delete: deleteProductApplication,
  },
};
