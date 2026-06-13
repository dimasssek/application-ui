import type { FieldConfig } from '../../types/applications/registry';

export type ApplicationFormMode = 'create' | 'edit';

export function filterFormFields(
  fields: FieldConfig[],
  mode: ApplicationFormMode
): FieldConfig[] {
  return fields.filter((field) => {
    if (mode === 'create' && field.editOnly) {
      return false;
    }
    if (mode === 'edit' && field.createOnly) {
      return false;
    }
    return true;
  });
}

export function editableFormFields(
  fields: FieldConfig[],
  mode: ApplicationFormMode
): FieldConfig[] {
  return filterFormFields(fields, mode).filter(
    (field) => !field.readOnly && !field.editOnly
  );
}

export function dtoToFormValues(
  dto: Record<string, unknown>
): Record<string, string> {
  return Object.entries(dto).reduce<Record<string, string>>(
    (acc, [key, value]) => {
      if (value == null) {
        acc[key] = '';
      } else if (typeof value === 'number') {
        acc[key] = String(value);
      } else if (
        typeof value === 'string' &&
        (key === 'birthDate' || key === 'validUntil') &&
        value.includes('T')
      ) {
        acc[key] = value.slice(0, 10);
      } else {
        acc[key] = String(value);
      }
      return acc;
    },
    {}
  );
}

export function validateFormValues(
  fields: FieldConfig[],
  values: Record<string, string>
): Record<string, string> {
  const errors: Record<string, string> = {};
  fields.forEach((field) => {
    if (field.required && !field.readOnly) {
      const raw = (values[field.key] ?? '').trim();
      if (!raw) {
        errors[field.key] = 'Обязательное поле';
      }
    }
  });
  return errors;
}

export function buildFormPayload(
  fields: FieldConfig[],
  mode: ApplicationFormMode,
  values: Record<string, string>
): Record<string, unknown> {
  const payload: Record<string, unknown> = {};
  editableFormFields(fields, mode).forEach((field) => {
    payload[field.key] = toApiValue(field, values[field.key] ?? '');
  });
  return payload;
}

function toApiValue(field: FieldConfig, raw: string): unknown {
  if (field.type === 'number') {
    const trimmed = raw.trim();
    if (!trimmed) {
      return null;
    }
    const parsed = Number(trimmed);
    return Number.isNaN(parsed) ? null : parsed;
  }

  const trimmed = raw.trim();
  if (!trimmed) {
    return field.required ? trimmed : null;
  }
  return trimmed;
}
