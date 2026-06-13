import {
  createProfileChangeApplication,
  deleteProfileChangeApplication,
  searchProfileChangeApplications,
  updateProfileChangeApplication,
} from '../../api/applications/profileChangeApplicationApi';
import { ROUTES } from '../../navigation/routes';
import { MOCK_CLIENT_ID } from './common';
import { APPLICATION_TYPE } from './enums';
import {
  EMPTY_PROFILE_CHANGE_APPLICATION_FILTERS,
  type ProfileChangeApplication,
  type ProfileChangeApplicationFilters,
} from './profileChange';
import {
  buildCommonDefaults,
  COMMON_COLUMNS,
  COMMON_FILTER_FIELDS,
  COMMON_FORM_FIELDS,
  type ApplicationConfig,
  type ColumnConfig,
  type FieldConfig,
} from './registry';

const PROFILE_CHANGE_FILTER_FIELDS: FieldConfig<keyof ProfileChangeApplicationFilters & string>[] =
  [
    ...(COMMON_FILTER_FIELDS as FieldConfig<keyof ProfileChangeApplicationFilters & string>[]),
    {
      key: 'change_type',
      label: 'Тип изменения',
      type: 'text',
      gridSize: { xs: 12, md: 4 },
    },
    {
      key: 'old_value',
      label: 'Старое значение',
      type: 'text',
      gridSize: { xs: 12, md: 4 },
    },
    {
      key: 'new_value',
      label: 'Новое значение',
      type: 'text',
      gridSize: { xs: 12, md: 4 },
    },
  ];

const PROFILE_CHANGE_COLUMNS: ColumnConfig<keyof ProfileChangeApplication & string>[] =
  [
    ...(COMMON_COLUMNS as ColumnConfig<keyof ProfileChangeApplication & string>[]),
    { key: 'change_type', label: 'Тип изменения', minWidth: 160 },
    { key: 'old_value', label: 'Старое значение', minWidth: 220 },
    { key: 'new_value', label: 'Новое значение', minWidth: 220 },
  ];

const PROFILE_CHANGE_FORM_FIELDS: FieldConfig<keyof ProfileChangeApplication & string>[] =
  [
    ...(COMMON_FORM_FIELDS as FieldConfig<keyof ProfileChangeApplication & string>[]),
    {
      key: 'change_type',
      label: 'Тип изменения',
      type: 'text',
      required: true,
      gridSize: { xs: 12, md: 6 },
    },
    {
      key: 'old_value',
      label: 'Старое значение',
      type: 'textarea',
      gridSize: { xs: 12, md: 12 },
    },
    {
      key: 'new_value',
      label: 'Новое значение',
      type: 'textarea',
      required: true,
      gridSize: { xs: 12, md: 12 },
    },
  ];

export const PROFILE_CHANGE_APPLICATION_CONFIG: ApplicationConfig<
  ProfileChangeApplication,
  ProfileChangeApplicationFilters
> = {
  title: 'Заявления на изменение данных клиента',
  description:
    'Список заявлений на корректировку персональных данных, адреса, контактов и других сведений.',
  path: ROUTES.applicationsProfileChanges,
  applicationTypeCode: APPLICATION_TYPE.PROFILE_CHANGE,
  emptyFilters: EMPTY_PROFILE_CHANGE_APPLICATION_FILTERS,
  filterFields: PROFILE_CHANGE_FILTER_FIELDS,
  columns: PROFILE_CHANGE_COLUMNS,
  formFields: PROFILE_CHANGE_FORM_FIELDS,
  buildDefaults: () => ({
    ...buildCommonDefaults(APPLICATION_TYPE.PROFILE_CHANGE),
    client_id: MOCK_CLIENT_ID,
    change_type: '',
    old_value: '',
    new_value: '',
  }),
  api: {
    search: searchProfileChangeApplications,
    create: createProfileChangeApplication,
    update: updateProfileChangeApplication,
    delete: deleteProfileChangeApplication,
  },
};
