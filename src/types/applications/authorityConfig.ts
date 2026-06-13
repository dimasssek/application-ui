import {
  createAuthorityApplication,
  deleteAuthorityApplication,
  searchAuthorityApplications,
  updateAuthorityApplication,
} from '../../api/applications/authorityApplicationApi';
import { ROUTES } from '../../navigation/routes';
import { MOCK_CLIENT_ID } from './common';
import { APPLICATION_TYPE } from './enums';
import {
  EMPTY_AUTHORITY_APPLICATION_FILTERS,
  type AuthorityApplication,
  type AuthorityApplicationFilters,
} from './authority';
import {
  buildCommonDefaults,
  COMMON_COLUMNS,
  COMMON_FILTER_FIELDS,
  COMMON_FORM_FIELDS,
  type ApplicationConfig,
  type ColumnConfig,
  type FieldConfig,
} from './registry';

const AUTHORITY_FILTER_FIELDS: FieldConfig<keyof AuthorityApplicationFilters & string>[] =
  [
    ...(COMMON_FILTER_FIELDS as FieldConfig<keyof AuthorityApplicationFilters & string>[]),
    {
      key: 'authority_type',
      label: 'Тип полномочия',
      type: 'text',
      gridSize: { xs: 12, md: 4 },
    },
    {
      key: 'person_name',
      label: 'ФИО уполномоченного',
      type: 'text',
      gridSize: { xs: 12, md: 4 },
    },
    {
      key: 'document_number',
      label: 'Номер документа',
      type: 'text',
      gridSize: { xs: 12, md: 4 },
    },
    {
      key: 'valid_until',
      label: 'Действительно до',
      type: 'date',
      gridSize: { xs: 12, md: 4 },
    },
  ];

const AUTHORITY_COLUMNS: ColumnConfig<keyof AuthorityApplication & string>[] =
  [
    ...(COMMON_COLUMNS as ColumnConfig<keyof AuthorityApplication & string>[]),
    { key: 'authority_type', label: 'Тип полномочия', minWidth: 180 },
    { key: 'person_name', label: 'Уполномоченное лицо', minWidth: 220 },
    { key: 'document_number', label: 'Номер документа', minWidth: 160 },
    {
      key: 'valid_until',
      label: 'Действительно до',
      minWidth: 150,
      format: 'date',
    },
  ];

const AUTHORITY_FORM_FIELDS: FieldConfig<keyof AuthorityApplication & string>[] =
  [
    ...(COMMON_FORM_FIELDS as FieldConfig<keyof AuthorityApplication & string>[]),
    {
      key: 'authority_type',
      label: 'Тип полномочия',
      type: 'text',
      required: true,
      gridSize: { xs: 12, md: 6 },
    },
    {
      key: 'person_name',
      label: 'ФИО уполномоченного',
      type: 'text',
      required: true,
      gridSize: { xs: 12, md: 6 },
    },
    {
      key: 'document_number',
      label: 'Номер документа',
      type: 'text',
      required: true,
      gridSize: { xs: 12, md: 6 },
    },
    {
      key: 'valid_until',
      label: 'Действительно до',
      type: 'date',
      required: true,
      gridSize: { xs: 12, md: 6 },
    },
  ];

export const AUTHORITY_APPLICATION_CONFIG: ApplicationConfig<
  AuthorityApplication,
  AuthorityApplicationFilters
> = {
  title: 'Заявления на полномочия',
  description:
    'Список заявлений на оформление и продление полномочий доверенных лиц.',
  path: ROUTES.applicationsAuthorities,
  applicationTypeCode: APPLICATION_TYPE.AUTHORITY,
  emptyFilters: EMPTY_AUTHORITY_APPLICATION_FILTERS,
  filterFields: AUTHORITY_FILTER_FIELDS,
  columns: AUTHORITY_COLUMNS,
  formFields: AUTHORITY_FORM_FIELDS,
  buildDefaults: () => ({
    ...buildCommonDefaults(APPLICATION_TYPE.AUTHORITY),
    client_id: MOCK_CLIENT_ID,
    authority_type: '',
    person_name: '',
    document_number: '',
    valid_until: '',
  }),
  api: {
    search: searchAuthorityApplications,
    create: createAuthorityApplication,
    update: updateAuthorityApplication,
    delete: deleteAuthorityApplication,
  },
};
