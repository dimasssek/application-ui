import {
  createDocumentApplication,
  deleteDocumentApplication,
  searchDocumentApplications,
  updateDocumentApplication,
} from '../../api/applications/documentApplicationApi';
import { ROUTES } from '../../navigation/routes';
import { MOCK_CLIENT_ID } from './common';
import { APPLICATION_TYPE } from './enums';
import {
  EMPTY_DOCUMENT_APPLICATION_FILTERS,
  type DocumentApplication,
  type DocumentApplicationFilters,
} from './document';
import {
  buildCommonDefaults,
  COMMON_COLUMNS,
  COMMON_FILTER_FIELDS,
  COMMON_FORM_FIELDS,
  type ApplicationConfig,
  type ColumnConfig,
  type FieldConfig,
} from './registry';

const DOCUMENT_FILTER_FIELDS: FieldConfig<keyof DocumentApplicationFilters & string>[] =
  [
    ...(COMMON_FILTER_FIELDS as FieldConfig<keyof DocumentApplicationFilters & string>[]),
    {
      key: 'document_type',
      label: 'Тип документа',
      type: 'text',
      gridSize: { xs: 12, md: 4 },
    },
    {
      key: 'delivery_type',
      label: 'Способ доставки',
      type: 'text',
      gridSize: { xs: 12, md: 4 },
    },
    {
      key: 'purpose',
      label: 'Назначение',
      type: 'text',
      gridSize: { xs: 12, md: 4 },
    },
  ];

const DOCUMENT_COLUMNS: ColumnConfig<keyof DocumentApplication & string>[] = [
  ...(COMMON_COLUMNS as ColumnConfig<keyof DocumentApplication & string>[]),
  { key: 'document_type', label: 'Тип документа', minWidth: 180 },
  { key: 'delivery_type', label: 'Доставка', minWidth: 140 },
  { key: 'purpose', label: 'Назначение', minWidth: 200 },
];

const DOCUMENT_FORM_FIELDS: FieldConfig<keyof DocumentApplication & string>[] =
  [
    ...(COMMON_FORM_FIELDS as FieldConfig<keyof DocumentApplication & string>[]),
    {
      key: 'document_type',
      label: 'Тип документа',
      type: 'text',
      required: true,
      gridSize: { xs: 12, md: 6 },
    },
    {
      key: 'delivery_type',
      label: 'Способ доставки',
      type: 'text',
      required: true,
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
  DocumentApplicationFilters
> = {
  title: 'Заявления на получение документа',
  description:
    'Список заявлений на выдачу справок, выписок и других банковских документов.',
  path: ROUTES.applicationsDocuments,
  applicationTypeCode: APPLICATION_TYPE.DOCUMENT,
  emptyFilters: EMPTY_DOCUMENT_APPLICATION_FILTERS,
  filterFields: DOCUMENT_FILTER_FIELDS,
  columns: DOCUMENT_COLUMNS,
  formFields: DOCUMENT_FORM_FIELDS,
  buildDefaults: () => ({
    ...buildCommonDefaults(APPLICATION_TYPE.DOCUMENT),
    client_id: MOCK_CLIENT_ID,
    document_type: '',
    delivery_type: '',
    purpose: '',
  }),
  api: {
    search: searchDocumentApplications,
    create: createDocumentApplication,
    update: updateDocumentApplication,
    delete: deleteDocumentApplication,
  },
};
