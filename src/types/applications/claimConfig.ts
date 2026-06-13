import {
  createClaimApplication,
  deleteClaimApplication,
  searchClaimApplications,
  updateClaimApplication,
} from '../../api/applications/claimApplicationApi';
import { ROUTES } from '../../navigation/routes';
import { APPLICATION_TYPE } from './enums';
import {
  EMPTY_CLAIM_APPLICATION_SEARCH_FILTERS,
  type ClaimApplication,
  type ClaimApplicationCreateRequest,
  type ClaimApplicationQueryParams,
  type ClaimApplicationSearchFilters,
  type ClaimApplicationUpdateRequest,
  toClaimApplicationQueryParams,
} from './claim';
import {
  buildClientFormDefaults,
  CLAIM_TYPE_LABELS,
  CLAIM_TYPE_OPTIONS,
  COMMON_COLUMNS,
  COMMON_FILTER_FIELDS,
  COMMON_FORM_FIELDS,
  type ApplicationConfig,
  type ColumnConfig,
  type FieldConfig,
} from './registry';

const CLAIM_FILTER_FIELDS: FieldConfig<
  keyof ClaimApplicationSearchFilters & string
>[] = [
  ...(COMMON_FILTER_FIELDS as FieldConfig<
    keyof ClaimApplicationSearchFilters & string
  >[]),
  {
    key: 'claimType',
    label: 'Тип претензии',
    type: 'select',
    options: CLAIM_TYPE_OPTIONS,
    labels: CLAIM_TYPE_LABELS,
    gridSize: { xs: 12, md: 4 },
  },
  {
    key: 'claimSubject',
    label: 'Тема',
    type: 'text',
    gridSize: { xs: 12, md: 4 },
  },
];

const CLAIM_COLUMNS: ColumnConfig<keyof ClaimApplication & string>[] = [
  ...(COMMON_COLUMNS as ColumnConfig<keyof ClaimApplication & string>[]),
  {
    key: 'claimType',
    label: 'Тип',
    minWidth: 160,
    labels: CLAIM_TYPE_LABELS,
  },
  { key: 'claimSubject', label: 'Тема', minWidth: 200 },
  { key: 'description', label: 'Описание', minWidth: 240 },
  { key: 'externalRef', label: 'Внешний номер', minWidth: 160 },
];

const CLAIM_FORM_FIELDS: FieldConfig<keyof ClaimApplication & string>[] = [
  ...(COMMON_FORM_FIELDS as FieldConfig<keyof ClaimApplication & string>[]),
  {
    key: 'claimType',
    label: 'Тип претензии',
    type: 'select',
    options: CLAIM_TYPE_OPTIONS,
    labels: CLAIM_TYPE_LABELS,
    required: true,
    gridSize: { xs: 12, md: 6 },
  },
  {
    key: 'claimSubject',
    label: 'Тема',
    type: 'text',
    required: true,
    gridSize: { xs: 12, md: 6 },
  },
  {
    key: 'description',
    label: 'Описание',
    type: 'textarea',
    gridSize: { xs: 12, md: 12 },
  },
  {
    key: 'externalRef',
    label: 'Внешний номер',
    type: 'text',
    gridSize: { xs: 12, md: 6 },
  },
];

export const CLAIM_APPLICATION_CONFIG: ApplicationConfig<
  ClaimApplication,
  ClaimApplicationSearchFilters,
  ClaimApplicationQueryParams,
  ClaimApplicationCreateRequest,
  ClaimApplicationUpdateRequest
> = {
  title: 'Претензии и обращения',
  description:
    'Список претензий, жалоб и обращений клиентов, поступающих по разным каналам.',
  path: ROUTES.applicationsClaims,
  applicationTypeCode: APPLICATION_TYPE.CLAIM,
  emptyFilters: EMPTY_CLAIM_APPLICATION_SEARCH_FILTERS,
  filterFields: CLAIM_FILTER_FIELDS,
  columns: CLAIM_COLUMNS,
  formFields: CLAIM_FORM_FIELDS,
  buildDefaults: () => ({
    ...buildClientFormDefaults(),
    claimType: '',
    claimSubject: '',
    description: '',
    externalRef: '',
  }),
  toQueryParams: toClaimApplicationQueryParams,
  api: {
    search: searchClaimApplications,
    create: createClaimApplication,
    update: updateClaimApplication,
    delete: deleteClaimApplication,
  },
};
