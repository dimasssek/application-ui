/**
 * Заявление на получение документа.
 * Поля общей части (application) + поля document_application.
 */
export type DocumentApplication = {
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

  document_type: string;
  delivery_type: string;
  purpose: string;
};

export type DocumentApplicationFilters = {
  status_business: string;
  reason: string;
  number: string;
  channel: string;
  created_date: string;
  closed_date: string;

  document_type: string;
  delivery_type: string;
  purpose: string;
};

export const EMPTY_DOCUMENT_APPLICATION_FILTERS: DocumentApplicationFilters = {
  status_business: '',
  reason: '',
  number: '',
  channel: '',
  created_date: '',
  closed_date: '',

  document_type: '',
  delivery_type: '',
  purpose: '',
};
