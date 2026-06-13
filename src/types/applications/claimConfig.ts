import {
  createClaimApplication,
  deleteClaimApplication,
  searchClaimApplications,
  updateClaimApplication,
} from '../../api/applications/claimApplicationApi';
import { ROUTES } from '../../navigation/routes';
import { MOCK_CLIENT_ID } from './common';
import { APPLICATION_TYPE } from './enums';
import {
  EMPTY_CLAIM_APPLICATION_FILTERS,
  type ClaimApplication,
  type ClaimApplicationFilters,
} from './claim';
import {
  buildCommonDefaults,
  COMMON_COLUMNS,
  COMMON_FILTER_FIELDS,
  COMMON_FORM_FIELDS,
  type ApplicationConfig,
  type ColumnConfig,
  type FieldConfig,
} from './registry';

const CLAIM_FILTER_FIELDS: FieldConfig<keyof ClaimApplicationFilters & string>[] =
  [
    ...(COMMON_FILTER_FIELDS as FieldConfig<keyof ClaimApplicationFilters & string>[]),
    {
      key: 'claim_type',
      label: 'Тип претензии',
      type: 'text',
      gridSize: { xs: 12, md: 4 },
    },
    {
      key: 'claim_subject',
      label: 'Тема',
      type: 'text',
      gridSize: { xs: 12, md: 4 },
    },
    {
      key: 'external_ref',
      label: 'Внешний номер',
      type: 'text',
      gridSize: { xs: 12, md: 4 },
    },
    {
      key: 'description',
      label: 'Описание',
      type: 'text',
      gridSize: { xs: 12, md: 12 },
    },
  ];

const CLAIM_COLUMNS: ColumnConfig<keyof ClaimApplication & string>[] = [
  ...(COMMON_COLUMNS as ColumnConfig<keyof ClaimApplication & string>[]),
  { key: 'claim_type', label: 'Тип', minWidth: 160 },
  { key: 'claim_subject', label: 'Тема', minWidth: 200 },
  { key: 'description', label: 'Описание', minWidth: 240 },
  { key: 'external_ref', label: 'Внешний номер', minWidth: 160 },
];

const CLAIM_FORM_FIELDS: FieldConfig<keyof ClaimApplication & string>[] = [
  ...(COMMON_FORM_FIELDS as FieldConfig<keyof ClaimApplication & string>[]),
  {
    key: 'claim_type',
    label: 'Тип претензии',
    type: 'text',
    required: true,
    gridSize: { xs: 12, md: 6 },
  },
  {
    key: 'claim_subject',
    label: 'Тема',
    type: 'text',
    required: true,
    gridSize: { xs: 12, md: 6 },
  },
  {
    key: 'description',
    label: 'Описание',
    type: 'textarea',
    required: true,
    gridSize: { xs: 12, md: 12 },
  },
  {
    key: 'external_ref',
    label: 'Внешний номер',
    type: 'text',
    gridSize: { xs: 12, md: 6 },
  },
];

export const CLAIM_APPLICATION_CONFIG: ApplicationConfig<
  ClaimApplication,
  ClaimApplicationFilters
> = {
  title: 'Претензии и обращения',
  description:
    'Список претензий, жалоб и обращений клиентов, поступающих по разным каналам.',
  path: ROUTES.applicationsClaims,
  applicationTypeCode: APPLICATION_TYPE.CLAIM,
  emptyFilters: EMPTY_CLAIM_APPLICATION_FILTERS,
  filterFields: CLAIM_FILTER_FIELDS,
  columns: CLAIM_COLUMNS,
  formFields: CLAIM_FORM_FIELDS,
  buildDefaults: () => ({
    ...buildCommonDefaults(APPLICATION_TYPE.CLAIM),
    client_id: MOCK_CLIENT_ID,
    claim_type: '',
    claim_subject: '',
    description: '',
    external_ref: '',
  }),
  api: {
    search: searchClaimApplications,
    create: createClaimApplication,
    update: updateClaimApplication,
    delete: deleteClaimApplication,
  },
};
