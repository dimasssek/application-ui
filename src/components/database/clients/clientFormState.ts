import type {
  ClientCreateRequest,
  ClientTo,
  ClientUpdateRequest,
} from '../../../types/client';
import type { Gender } from '../../../types/client/enums';
import { GENDER } from '../../../types/client/enums';

export type ClientFormValues = {
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
  addressDefined: boolean;
  residenceAddressName: string;
};

export const EMPTY_CLIENT_FORM_VALUES: ClientFormValues = {
  lastName: '',
  firstName: '',
  patronymic: '',
  birthDate: '',
  gender: GENDER.UNDEFINED,
  identityDocumentSeries: '',
  identityDocumentNumber: '',
  identityDocumentIssueDate: '',
  itn: '',
  insuranceNumber: '',
  addressDefined: false,
  residenceAddressName: '',
};

export type ClientFormErrors = Partial<Record<keyof ClientFormValues, string>>;

export function clientToFormValues(client: ClientTo): ClientFormValues {
  return {
    lastName: client.lastName,
    firstName: client.firstName,
    patronymic: client.patronymic ?? '',
    birthDate: client.birthDate,
    gender: client.gender,
    identityDocumentSeries: client.identityDocumentSeries,
    identityDocumentNumber: client.identityDocumentNumber ?? '',
    identityDocumentIssueDate: client.identityDocumentIssueDate ?? '',
    itn: client.itn ?? '',
    insuranceNumber: client.insuranceNumber ?? '',
    addressDefined: client.addressDefined,
    residenceAddressName: client.residenceAddressName,
  };
}

function emptyToNull(value: string): string | null {
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

export function formValuesToCreateRequest(
  values: ClientFormValues
): ClientCreateRequest {
  return {
    lastName: values.lastName.trim(),
    firstName: values.firstName.trim(),
    patronymic: emptyToNull(values.patronymic),
    birthDate: values.birthDate,
    gender: values.gender as Gender,
    identityDocumentSeries: values.identityDocumentSeries.trim(),
    identityDocumentNumber: emptyToNull(values.identityDocumentNumber),
    identityDocumentIssueDate: values.identityDocumentIssueDate.trim()
      ? values.identityDocumentIssueDate
      : null,
    itn: emptyToNull(values.itn),
    insuranceNumber: emptyToNull(values.insuranceNumber),
    addressDefined: values.addressDefined,
    residenceAddressName: values.residenceAddressName.trim(),
  };
}

export function formValuesToUpdateRequest(
  values: ClientFormValues
): ClientUpdateRequest {
  return formValuesToCreateRequest(values);
}

export function validateClientForm(values: ClientFormValues): {
  valid: boolean;
  errors: ClientFormErrors;
} {
  const errors: ClientFormErrors = {};

  if (!values.lastName.trim()) errors.lastName = 'Обязательное поле';
  if (!values.firstName.trim()) errors.firstName = 'Обязательное поле';
  if (!values.birthDate.trim()) errors.birthDate = 'Обязательное поле';
  if (!values.gender.trim()) errors.gender = 'Обязательное поле';
  if (!values.identityDocumentSeries.trim()) {
    errors.identityDocumentSeries = 'Обязательное поле';
  }
  if (!values.residenceAddressName.trim()) {
    errors.residenceAddressName = 'Обязательное поле';
  }

  return { valid: Object.keys(errors).length === 0, errors };
}
