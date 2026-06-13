import {
  createProfileChangeApplication,
  deleteProfileChangeApplication,
  searchProfileChangeApplications,
  updateProfileChangeApplication,
} from '../../api/applications/profileChangeApplicationApi';
import { ROUTES } from '../../navigation/routes';
import { APPLICATION_TYPE } from './enums';
import {
  EMPTY_PROFILE_CHANGE_APPLICATION_SEARCH_FILTERS,
  type ProfileChangeApplication,
  type ProfileChangeApplicationCreateRequest,
  type ProfileChangeApplicationQueryParams,
  type ProfileChangeApplicationSearchFilters,
  type ProfileChangeApplicationUpdateRequest,
  toProfileChangeApplicationQueryParams,
} from './profileChange';
import {
  buildClientFormDefaults,
  CLIENT_CHANGE_TYPE_LABELS,
  CLIENT_CHANGE_TYPE_OPTIONS,
  COMMON_COLUMNS,
  COMMON_FILTER_FIELDS,
  COMMON_FORM_FIELDS,
  type ApplicationConfig,
  type ColumnConfig,
  type FieldConfig,
} from './registry';

const PROFILE_CHANGE_FILTER_FIELDS: FieldConfig<
  keyof ProfileChangeApplicationSearchFilters & string
>[] = [
  ...(COMMON_FILTER_FIELDS as FieldConfig<
    keyof ProfileChangeApplicationSearchFilters & string
  >[]),
  {
    key: 'changeType',
    label: 'Тип изменения',
    type: 'select',
    options: CLIENT_CHANGE_TYPE_OPTIONS,
    labels: CLIENT_CHANGE_TYPE_LABELS,
    gridSize: { xs: 12, md: 4 },
  },
];

const PROFILE_CHANGE_COLUMNS: ColumnConfig<
  keyof ProfileChangeApplication & string
>[] = [
  ...(COMMON_COLUMNS as ColumnConfig<
    keyof ProfileChangeApplication & string
  >[]),
  {
    key: 'changeType',
    label: 'Тип изменения',
    minWidth: 160,
    labels: CLIENT_CHANGE_TYPE_LABELS,
  },
  { key: 'oldValue', label: 'Старое значение', minWidth: 220 },
  { key: 'newValue', label: 'Новое значение', minWidth: 220 },
];

const PROFILE_CHANGE_FORM_FIELDS: FieldConfig<
  keyof ProfileChangeApplication & string
>[] = [
  ...(COMMON_FORM_FIELDS as FieldConfig<
    keyof ProfileChangeApplication & string
  >[]),
  {
    key: 'changeType',
    label: 'Тип изменения',
    type: 'select',
    options: CLIENT_CHANGE_TYPE_OPTIONS,
    labels: CLIENT_CHANGE_TYPE_LABELS,
    required: true,
    gridSize: { xs: 12, md: 6 },
  },
  {
    key: 'oldValue',
    label: 'Старое значение',
    type: 'textarea',
    gridSize: { xs: 12, md: 12 },
  },
  {
    key: 'newValue',
    label: 'Новое значение',
    type: 'textarea',
    gridSize: { xs: 12, md: 12 },
  },
];

export const PROFILE_CHANGE_APPLICATION_CONFIG: ApplicationConfig<
  ProfileChangeApplication,
  ProfileChangeApplicationSearchFilters,
  ProfileChangeApplicationQueryParams,
  ProfileChangeApplicationCreateRequest,
  ProfileChangeApplicationUpdateRequest
> = {
  title: 'Заявления на изменение данных клиента',
  description:
    'Список заявлений на корректировку персональных данных, адреса, контактов и других сведений.',
  path: ROUTES.applicationsProfileChanges,
  applicationTypeCode: APPLICATION_TYPE.PROFILE_CHANGE,
  emptyFilters: EMPTY_PROFILE_CHANGE_APPLICATION_SEARCH_FILTERS,
  filterFields: PROFILE_CHANGE_FILTER_FIELDS,
  columns: PROFILE_CHANGE_COLUMNS,
  formFields: PROFILE_CHANGE_FORM_FIELDS,
  buildDefaults: () => ({
    ...buildClientFormDefaults(),
    changeType: '',
    oldValue: '',
    newValue: '',
  }),
  toQueryParams: toProfileChangeApplicationQueryParams,
  api: {
    search: searchProfileChangeApplications,
    create: createProfileChangeApplication,
    update: updateProfileChangeApplication,
    delete: deleteProfileChangeApplication,
  },
};
