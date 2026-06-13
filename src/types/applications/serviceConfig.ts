import {
  createServiceApplication,
  deleteServiceApplication,
  searchServiceApplications,
  updateServiceApplication,
} from '../../api/applications/serviceApplicationApi';
import { ROUTES } from '../../navigation/routes';
import { MOCK_CLIENT_ID } from './common';
import { APPLICATION_TYPE } from './enums';
import {
  EMPTY_SERVICE_APPLICATION_FILTERS,
  type ServiceApplication,
  type ServiceApplicationFilters,
} from './service';
import {
  buildCommonDefaults,
  COMMON_COLUMNS,
  COMMON_FILTER_FIELDS,
  COMMON_FORM_FIELDS,
  type ApplicationConfig,
  type ColumnConfig,
  type FieldConfig,
} from './registry';

const SERVICE_FILTER_FIELDS: FieldConfig<keyof ServiceApplicationFilters & string>[] =
  [
    ...(COMMON_FILTER_FIELDS as FieldConfig<keyof ServiceApplicationFilters & string>[]),
    {
      key: 'service_type',
      label: 'Тип услуги',
      type: 'text',
      gridSize: { xs: 12, md: 4 },
    },
    {
      key: 'service_name',
      label: 'Название услуги',
      type: 'text',
      gridSize: { xs: 12, md: 4 },
    },
    {
      key: 'action_type',
      label: 'Действие',
      type: 'text',
      gridSize: { xs: 12, md: 4 },
    },
  ];

const SERVICE_COLUMNS: ColumnConfig<keyof ServiceApplication & string>[] = [
  ...(COMMON_COLUMNS as ColumnConfig<keyof ServiceApplication & string>[]),
  { key: 'service_type', label: 'Тип услуги', minWidth: 160 },
  { key: 'service_name', label: 'Название услуги', minWidth: 200 },
  { key: 'action_type', label: 'Действие', minWidth: 120 },
];

const SERVICE_FORM_FIELDS: FieldConfig<keyof ServiceApplication & string>[] = [
  ...(COMMON_FORM_FIELDS as FieldConfig<keyof ServiceApplication & string>[]),
  {
    key: 'service_type',
    label: 'Тип услуги',
    type: 'text',
    required: true,
    gridSize: { xs: 12, md: 6 },
  },
  {
    key: 'service_name',
    label: 'Название услуги',
    type: 'text',
    required: true,
    gridSize: { xs: 12, md: 6 },
  },
  {
    key: 'action_type',
    label: 'Действие',
    type: 'text',
    required: true,
    gridSize: { xs: 12, md: 6 },
  },
];

export const SERVICE_APPLICATION_CONFIG: ApplicationConfig<
  ServiceApplication,
  ServiceApplicationFilters
> = {
  title: 'Заявления на банковскую услугу',
  description:
    'Список заявлений на подключение, изменение и отключение банковских услуг.',
  path: ROUTES.applicationsServices,
  applicationTypeCode: APPLICATION_TYPE.SERVICE,
  emptyFilters: EMPTY_SERVICE_APPLICATION_FILTERS,
  filterFields: SERVICE_FILTER_FIELDS,
  columns: SERVICE_COLUMNS,
  formFields: SERVICE_FORM_FIELDS,
  buildDefaults: () => ({
    ...buildCommonDefaults(APPLICATION_TYPE.SERVICE),
    client_id: MOCK_CLIENT_ID,
    service_type: '',
    service_name: '',
    action_type: '',
  }),
  api: {
    search: searchServiceApplications,
    create: createServiceApplication,
    update: updateServiceApplication,
    delete: deleteServiceApplication,
  },
};
