/**
 * Заявление-претензия или обращение.
 * Поля общей части (application) + поля claim_application.
 */
export type ClaimApplication = {
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

  claim_type: string;
  claim_subject: string;
  description: string;
  external_ref: string;
};

export type ClaimApplicationFilters = {
  status_business: string;
  reason: string;
  number: string;
  channel: string;
  created_date: string;
  closed_date: string;

  claim_type: string;
  claim_subject: string;
  description: string;
  external_ref: string;
};

export const EMPTY_CLAIM_APPLICATION_FILTERS: ClaimApplicationFilters = {
  status_business: '',
  reason: '',
  number: '',
  channel: '',
  created_date: '',
  closed_date: '',

  claim_type: '',
  claim_subject: '',
  description: '',
  external_ref: '',
};
