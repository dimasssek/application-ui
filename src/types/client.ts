export type BankClient = {
  id: string;
  lastName: string;
  firstName: string;
  patronymic: string;
  birthDate: string;
  gender: string;
  identityDocumentSeries: string;
  identityDocumentNumber: string;
  identityDocumentIssueDate: string;
  itn: string;
  insuranceNumber: string;
  actualDate: string;
  residenceAddressName: string;
  status: string;
};

export type ClientSearchFilters = {
  lastName: string;
  firstName: string;
  patronymic: string;
  birthDate: string;
  gender: string;
  identityDocumentSeries: string;
  identityDocumentNumber: string;
  identityDocumentIssueDate: string;
  itn: string;
  insuranceNumber: string;
  actualDate: string;
  residenceAddressName: string;
  status: string;
};

export const EMPTY_CLIENT_SEARCH_FILTERS: ClientSearchFilters = {
  lastName: '',
  firstName: '',
  patronymic: '',
  birthDate: '',
  gender: '',
  identityDocumentSeries: '',
  identityDocumentNumber: '',
  identityDocumentIssueDate: '',
  itn: '',
  insuranceNumber: '',
  actualDate: '',
  residenceAddressName: '',
  status: '',
};
