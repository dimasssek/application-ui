import {
  createServiceApplication,
  deleteServiceApplication,
  searchServiceApplications,
  updateServiceApplication,
} from '../../api/applications/serviceApplicationApi';
import { ROUTES } from '../../navigation/routes';
import { APPLICATION_TYPE } from './enums';
import {
  EMPTY_SERVICE_APPLICATION_SEARCH_FILTERS,
  type ServiceApplication,
  type ServiceApplicationCreateRequest,
  type ServiceApplicationQueryParams,
  type ServiceApplicationSearchFilters,
  type ServiceApplicationUpdateRequest,
  toServiceApplicationQueryParams,
} from './service';
import {
  buildClientFormDefaults,
  COMMON_COLUMNS,
  COMMON_FILTER_FIELDS,
  COMMON_FORM_FIELDS,
  SERVICE_ACTION_TYPE_LABELS,
  SERVICE_ACTION_TYPE_OPTIONS,
  SERVICE_TYPE_LABELS,
  SERVICE_TYPE_OPTIONS,
  type ApplicationConfig,
  type ColumnConfig,
  type FieldConfig,
} from './registry';

const SERVICE_FILTER_FIELDS: FieldConfig<
  keyof ServiceApplicationSearchFilters & string
>[] = [
  ...(COMMON_FILTER_FIELDS as FieldConfig<
    keyof ServiceApplicationSearchFilters & string
  >[]),
  {
    key: 'serviceType',
    label: 'Тип услуги',
    type: 'select',
    options: SERVICE_TYPE_OPTIONS,
    labels: SERVICE_TYPE_LABELS,
    gridSize: { xs: 12, md: 4 },
  },
  {
    key: 'serviceName',
    label: 'Название услуги',
    type: 'text',
    gridSize: { xs: 12, md: 4 },
  },
  {
    key: 'actionType',
    label: 'Действие',
    type: 'select',
    options: SERVICE_ACTION_TYPE_OPTIONS,
    labels: SERVICE_ACTION_TYPE_LABELS,
    gridSize: { xs: 12, md: 4 },
  },
];

const SERVICE_COLUMNS: ColumnConfig<keyof ServiceApplication & string>[] = [
  ...(COMMON_COLUMNS as ColumnConfig<keyof ServiceApplication & string>[]),
  {
    key: 'serviceType',
    label: 'Тип услуги',
    minWidth: 160,
    labels: SERVICE_TYPE_LABELS,
  },
  { key: 'serviceName', label: 'Название услуги', minWidth: 200 },
  {
    key: 'actionType',
    label: 'Действие',
    minWidth: 120,
    labels: SERVICE_ACTION_TYPE_LABELS,
  },
];

const SERVICE_FORM_FIELDS: FieldConfig<keyof ServiceApplication & string>[] = [
  ...(COMMON_FORM_FIELDS as FieldConfig<keyof ServiceApplication & string>[]),
  {
    key: 'serviceType',
    label: 'Тип услуги',
    type: 'select',
    options: SERVICE_TYPE_OPTIONS,
    labels: SERVICE_TYPE_LABELS,
    required: true,
    gridSize: { xs: 12, md: 6 },
  },
  {
    key: 'serviceName',
    label: 'Название услуги',
    type: 'text',
    required: true,
    gridSize: { xs: 12, md: 6 },
  },
  {
    key: 'actionType',
    label: 'Действие',
    type: 'select',
    options: SERVICE_ACTION_TYPE_OPTIONS,
    labels: SERVICE_ACTION_TYPE_LABELS,
    required: true,
    gridSize: { xs: 12, md: 6 },
  },
];

export const SERVICE_APPLICATION_CONFIG: ApplicationConfig<
  ServiceApplication,
  ServiceApplicationSearchFilters,
  ServiceApplicationQueryParams,
  ServiceApplicationCreateRequest,
  ServiceApplicationUpdateRequest
> = {
  title: 'Заявления на банковскую услугу',
  description:
    'Список заявлений на подключение, изменение и отключение банковских услуг.',
  path: ROUTES.applicationsServices,
  applicationTypeCode: APPLICATION_TYPE.SERVICE,
  emptyFilters: EMPTY_SERVICE_APPLICATION_SEARCH_FILTERS,
  filterFields: SERVICE_FILTER_FIELDS,
  columns: SERVICE_COLUMNS,
  formFields: SERVICE_FORM_FIELDS,
  buildDefaults: () => ({
    ...buildClientFormDefaults(),
    serviceType: '',
    serviceName: '',
    actionType: '',
  }),
  toQueryParams: toServiceApplicationQueryParams,
  api: {
    search: searchServiceApplications,
    create: createServiceApplication,
    update: updateServiceApplication,
    delete: deleteServiceApplication,
  },
};
