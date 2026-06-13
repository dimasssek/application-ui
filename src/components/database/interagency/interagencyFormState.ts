import type { Gender, SourceType } from '../../../types/client/enums';
import { GENDER } from '../../../types/client/enums';

export type InteragencyManualFormValues = {
  letterNumber: string;
  letterDate: string;
  sourceType: string;
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
};

export const EMPTY_INTERAGENCY_MANUAL_FORM_VALUES: InteragencyManualFormValues =
  {
    letterNumber: '',
    letterDate: '',
    sourceType: '',
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
  };

export type InteragencyManualFormErrors = Partial<
  Record<keyof InteragencyManualFormValues, string>
>;

function emptyToNull(value: string): string | null {
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

export function validateInteragencyManualForm(
  values: InteragencyManualFormValues
): { valid: boolean; errors: InteragencyManualFormErrors } {
  const errors: InteragencyManualFormErrors = {};
  if (!values.letterNumber.trim()) errors.letterNumber = 'Обязательное поле';
  if (!values.letterDate.trim()) errors.letterDate = 'Обязательное поле';
  if (!values.sourceType.trim()) errors.sourceType = 'Обязательное поле';
  if (!values.lastName.trim()) errors.lastName = 'Обязательное поле';
  if (!values.firstName.trim()) errors.firstName = 'Обязательное поле';
  if (!values.birthDate.trim()) errors.birthDate = 'Обязательное поле';
  if (!values.gender.trim()) errors.gender = 'Обязательное поле';
  if (!values.identityDocumentSeries.trim()) {
    errors.identityDocumentSeries = 'Обязательное поле';
  }
  return { valid: Object.keys(errors).length === 0, errors };
}

export function interagencyManualFormToRequest(
  values: InteragencyManualFormValues,
  initiatorLogin: string
) {
  return {
    letterNumber: values.letterNumber.trim(),
    letterDate: values.letterDate.trim(),
    sourceType: values.sourceType as SourceType,
    initiatorLogin,
    lastName: values.lastName.trim(),
    firstName: values.firstName.trim(),
    patronymic: emptyToNull(values.patronymic),
    birthDate: values.birthDate.trim(),
    gender: values.gender as Gender,
    identityDocumentSeries: values.identityDocumentSeries.trim(),
    identityDocumentNumber: emptyToNull(values.identityDocumentNumber),
    identityDocumentIssueDate: emptyToNull(values.identityDocumentIssueDate),
    itn: emptyToNull(values.itn),
    insuranceNumber: emptyToNull(values.insuranceNumber),
  };
}

export type InteragencyLetterFormValues = {
  letterNumber: string;
  letterDate: string;
  sourceType: string;
};

export const EMPTY_INTERAGENCY_LETTER_FORM: InteragencyLetterFormValues = {
  letterNumber: '',
  letterDate: '',
  sourceType: '',
};

export function validateInteragencyLetterForm(
  values: InteragencyLetterFormValues
): { valid: boolean; errors: Partial<Record<keyof InteragencyLetterFormValues, string>> } {
  const errors: Partial<Record<keyof InteragencyLetterFormValues, string>> = {};
  if (!values.letterNumber.trim()) errors.letterNumber = 'Обязательное поле';
  if (!values.letterDate.trim()) errors.letterDate = 'Обязательное поле';
  if (!values.sourceType.trim()) errors.sourceType = 'Обязательное поле';
  return { valid: Object.keys(errors).length === 0, errors };
}
