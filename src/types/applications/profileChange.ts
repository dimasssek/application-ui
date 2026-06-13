/**
 * Заявление на изменение данных клиента.
 * Поля общей части (application) + поля profile_change_application.
 */
export type ProfileChangeApplication = {
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

  change_type: string;
  old_value: string;
  new_value: string;
};

export type ProfileChangeApplicationFilters = {
  status_business: string;
  reason: string;
  number: string;
  channel: string;
  created_date: string;
  closed_date: string;

  change_type: string;
  old_value: string;
  new_value: string;
};

export const EMPTY_PROFILE_CHANGE_APPLICATION_FILTERS: ProfileChangeApplicationFilters =
  {
    status_business: '',
    reason: '',
    number: '',
    channel: '',
    created_date: '',
    closed_date: '',

    change_type: '',
    old_value: '',
    new_value: '',
  };
