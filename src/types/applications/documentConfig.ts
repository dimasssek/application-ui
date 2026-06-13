import {
  createDocumentApplication,
  deleteDocumentApplication,
  searchDocumentApplications,
  updateDocumentApplication,
} from '../../api/applications/documentApplicationApi';
import { ROUTES } from '../../navigation/routes';
import { APPLICATION_TYPE } from './enums';
import {
  EMPTY_DOCUMENT_APPLICATION_SEARCH_FILTERS,
  type DocumentApplication,
  type DocumentApplicationCreateRequest,
  type DocumentApplicationQueryParams,
  type DocumentApplicationSearchFilters,
  type DocumentApplicationUpdateRequest,
  toDocumentApplicationQueryParams,
} from './document';
import {
  buildClientFormDefaults,
  COMMON_COLUMNS,
  COMMON_FILTER_FIELDS,
  COMMON_FORM_FIELDS,
  DOCUMENT_DELIVERY_TYPE_LABELS,
  DOCUMENT_DELIVERY_TYPE_OPTIONS,
  DOCUMENT_TYPE_LABELS,
  DOCUMENT_TYPE_OPTIONS,
  type ApplicationConfig,
  type ColumnConfig,
  type FieldConfig,
} from './registry';

const DOCUMENT_FILTER_FIELDS: FieldConfig<
  keyof DocumentApplicationSearchFilters & string
>[] = [
  ...(COMMON_FILTER_FIELDS as FieldConfig<
    keyof DocumentApplicationSearchFilters & string
  >[]),
  {
    key: 'documentType',
    label: 'Тип документа',
    type: 'select',
    options: DOCUMENT_TYPE_OPTIONS,
    labels: DOCUMENT_TYPE_LABELS,
    gridSize: { xs: 12, md: 4 },
  },
  {
    key: 'deliveryType',
    label: 'Способ доставки',
    type: 'select',
    options: DOCUMENT_DELIVERY_TYPE_OPTIONS,
    labels: DOCUMENT_DELIVERY_TYPE_LABELS,
    gridSize: { xs: 12, md: 4 },
  },
];

const DOCUMENT_COLUMNS: ColumnConfig<keyof DocumentApplication & string>[] = [
  ...(COMMON_COLUMNS as ColumnConfig<keyof DocumentApplication & string>[]),
  {
    key: 'documentType',
    label: 'Тип документа',
    minWidth: 180,
    labels: DOCUMENT_TYPE_LABELS,
  },
  {
    key: 'deliveryType',
    label: 'Доставка',
    minWidth: 140,
    labels: DOCUMENT_DELIVERY_TYPE_LABELS,
  },
  { key: 'purpose', label: 'Назначение', minWidth: 200 },
];

const DOCUMENT_FORM_FIELDS: FieldConfig<keyof DocumentApplication & string>[] =
  [
    ...(COMMON_FORM_FIELDS as FieldConfig<
      keyof DocumentApplication & string
    >[]),
    {
      key: 'documentType',
      label: 'Тип документа',
      type: 'select',
      options: DOCUMENT_TYPE_OPTIONS,
      labels: DOCUMENT_TYPE_LABELS,
      required: true,
      gridSize: { xs: 12, md: 6 },
    },
    {
      key: 'deliveryType',
      label: 'Способ доставки',
      type: 'select',
      options: DOCUMENT_DELIVERY_TYPE_OPTIONS,
      labels: DOCUMENT_DELIVERY_TYPE_LABELS,
      gridSize: { xs: 12, md: 6 },
    },
    {
      key: 'purpose',
      label: 'Назначение',
      type: 'textarea',
      gridSize: { xs: 12, md: 12 },
    },
  ];

export const DOCUMENT_APPLICATION_CONFIG: ApplicationConfig<
  DocumentApplication,
  DocumentApplicationSearchFilters,
  DocumentApplicationQueryParams,
  DocumentApplicationCreateRequest,
  DocumentApplicationUpdateRequest
> = {
  title: 'Заявления на получение документа',
  description:
    'Список заявлений на выдачу справок, выписок и других банковских документов.',
  path: ROUTES.applicationsDocuments,
  applicationTypeCode: APPLICATION_TYPE.DOCUMENT,
  emptyFilters: EMPTY_DOCUMENT_APPLICATION_SEARCH_FILTERS,
  filterFields: DOCUMENT_FILTER_FIELDS,
  columns: DOCUMENT_COLUMNS,
  formFields: DOCUMENT_FORM_FIELDS,
  buildDefaults: () => ({
    ...buildClientFormDefaults(),
    documentType: '',
    deliveryType: '',
    purpose: '',
  }),
  toQueryParams: toDocumentApplicationQueryParams,
  api: {
    search: searchDocumentApplications,
    create: createDocumentApplication,
    update: updateDocumentApplication,
    delete: deleteDocumentApplication,
  },
};
