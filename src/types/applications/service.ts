/**
 * Заявление на банковскую услугу.
 * Поля общей части (application) + поля service_application.
 */
export type ServiceApplication = {
  id: string;
  client_id: string;
  number: string;
  application_type: string;
  channel: string;
  status_internal: string;
  status_business: string;
  reason: string;
  created_date: string;
  closed_date: string | null;

  service_type: string;
  service_name: string;
  action_type: string;
};

export type ServiceApplicationFilters = {
  status_business: string;
  reason: string;
  number: string;
  channel: string;
  created_date: string;
  closed_date: string;

  service_type: string;
  service_name: string;
  action_type: string;
};

export const EMPTY_SERVICE_APPLICATION_FILTERS: ServiceApplicationFilters = {
  status_business: '',
  reason: '',
  number: '',
  channel: '',
  created_date: '',
  closed_date: '',

  service_type: '',
  service_name: '',
  action_type: '',
};
