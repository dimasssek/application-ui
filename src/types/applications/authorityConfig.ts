import {
  createAuthorityApplication,
  deleteAuthorityApplication,
  searchAuthorityApplications,
  updateAuthorityApplication,
} from '../../api/applications/authorityApplicationApi';
import { ROUTES } from '../../navigation/routes';
import { APPLICATION_TYPE } from './enums';
import {
  EMPTY_AUTHORITY_APPLICATION_SEARCH_FILTERS,
  type AuthorityApplication,
  type AuthorityApplicationCreateRequest,
  type AuthorityApplicationQueryParams,
  type AuthorityApplicationSearchFilters,
  type AuthorityApplicationUpdateRequest,
  toAuthorityApplicationQueryParams,
} from './authority';
import {
  AUTHORITY_TYPE_LABELS,
  AUTHORITY_TYPE_OPTIONS,
  buildClientFormDefaults,
  COMMON_COLUMNS,
  COMMON_FILTER_FIELDS,
  COMMON_FORM_FIELDS,
  type ApplicationConfig,
  type ColumnConfig,
  type FieldConfig,
} from './registry';

const AUTHORITY_FILTER_FIELDS: FieldConfig<
  keyof AuthorityApplicationSearchFilters & string
>[] = [
  ...(COMMON_FILTER_FIELDS as FieldConfig<
    keyof AuthorityApplicationSearchFilters & string
  >[]),
  {
    key: 'authorityType',
    label: 'Тип полномочия',
    type: 'select',
    options: AUTHORITY_TYPE_OPTIONS,
    labels: AUTHORITY_TYPE_LABELS,
    gridSize: { xs: 12, md: 4 },
  },
  {
    key: 'personName',
    label: 'ФИО уполномоченного',
    type: 'text',
    gridSize: { xs: 12, md: 4 },
  },
];

const AUTHORITY_COLUMNS: ColumnConfig<keyof AuthorityApplication & string>[] = [
  ...(COMMON_COLUMNS as ColumnConfig<keyof AuthorityApplication & string>[]),
  {
    key: 'authorityType',
    label: 'Тип полномочия',
    minWidth: 180,
    labels: AUTHORITY_TYPE_LABELS,
  },
  { key: 'personName', label: 'Уполномоченное лицо', minWidth: 220 },
  { key: 'documentNumber', label: 'Номер документа', minWidth: 160 },
  {
    key: 'validUntil',
    label: 'Действительно до',
    minWidth: 150,
    format: 'date',
  },
];

const AUTHORITY_FORM_FIELDS: FieldConfig<
  keyof AuthorityApplication & string
>[] = [
  ...(COMMON_FORM_FIELDS as FieldConfig<
    keyof AuthorityApplication & string
  >[]),
  {
    key: 'authorityType',
    label: 'Тип полномочия',
    type: 'select',
    options: AUTHORITY_TYPE_OPTIONS,
    labels: AUTHORITY_TYPE_LABELS,
    required: true,
    gridSize: { xs: 12, md: 6 },
  },
  {
    key: 'personName',
    label: 'ФИО уполномоченного',
    type: 'text',
    required: true,
    gridSize: { xs: 12, md: 6 },
  },
  {
    key: 'documentNumber',
    label: 'Номер документа',
    type: 'text',
    gridSize: { xs: 12, md: 6 },
  },
  {
    key: 'validUntil',
    label: 'Действительно до',
    type: 'date',
    gridSize: { xs: 12, md: 6 },
  },
];

export const AUTHORITY_APPLICATION_CONFIG: ApplicationConfig<
  AuthorityApplication,
  AuthorityApplicationSearchFilters,
  AuthorityApplicationQueryParams,
  AuthorityApplicationCreateRequest,
  AuthorityApplicationUpdateRequest
> = {
  title: 'Заявления на полномочия',
  description:
    'Список заявлений на оформление и продление полномочий доверенных лиц.',
  path: ROUTES.applicationsAuthorities,
  applicationTypeCode: APPLICATION_TYPE.AUTHORITY,
  emptyFilters: EMPTY_AUTHORITY_APPLICATION_SEARCH_FILTERS,
  filterFields: AUTHORITY_FILTER_FIELDS,
  columns: AUTHORITY_COLUMNS,
  formFields: AUTHORITY_FORM_FIELDS,
  buildDefaults: () => ({
    ...buildClientFormDefaults(),
    authorityType: '',
    personName: '',
    documentNumber: '',
    validUntil: '',
  }),
  toQueryParams: toAuthorityApplicationQueryParams,
  api: {
    search: searchAuthorityApplications,
    create: createAuthorityApplication,
    update: updateAuthorityApplication,
    delete: deleteAuthorityApplication,
  },
};
