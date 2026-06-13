/**
 * Заявление на полномочия и доступы.
 * Поля общей части (application) + поля authority_application.
 */
export type AuthorityApplication = {
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

  authority_type: string;
  person_name: string;
  document_number: string;
  valid_until: string;
};

export type AuthorityApplicationFilters = {
  status_business: string;
  reason: string;
  number: string;
  channel: string;
  created_date: string;
  closed_date: string;

  authority_type: string;
  person_name: string;
  document_number: string;
  valid_until: string;
};

export const EMPTY_AUTHORITY_APPLICATION_FILTERS: AuthorityApplicationFilters =
  {
    status_business: '',
    reason: '',
    number: '',
    channel: '',
    created_date: '',
    closed_date: '',

    authority_type: '',
    person_name: '',
    document_number: '',
    valid_until: '',
  };
