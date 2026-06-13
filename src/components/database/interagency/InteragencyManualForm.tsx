import { MenuItem, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import {
  GENDER_OPTIONS,
  SOURCE_TYPE_OPTIONS,
} from '../../../types/client/enums';
import type {
  InteragencyManualFormErrors,
  InteragencyManualFormValues,
} from './interagencyFormState';

type InteragencyManualFormProps = {
  values: InteragencyManualFormValues;
  errors: InteragencyManualFormErrors;
  onChange: (values: InteragencyManualFormValues) => void;
  disabled?: boolean;
};

function label(text: string, required?: boolean) {
  return required ? `${text} *` : text;
}

export function InteragencyManualForm({
  values,
  errors,
  onChange,
  disabled = false,
}: InteragencyManualFormProps) {
  const update = <K extends keyof InteragencyManualFormValues>(
    key: K,
    value: InteragencyManualFormValues[K]
  ) => {
    onChange({ ...values, [key]: value });
  };

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 4 }}>
        <TextField
          fullWidth
          size="small"
          label={label('Номер запроса', true)}
          value={values.letterNumber}
          onChange={(e) => update('letterNumber', e.target.value)}
          error={Boolean(errors.letterNumber)}
          helperText={errors.letterNumber}
          disabled={disabled}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <TextField
          fullWidth
          size="small"
          type="date"
          label={label('Дата запроса', true)}
          value={values.letterDate}
          onChange={(e) => update('letterDate', e.target.value)}
          InputLabelProps={{ shrink: true }}
          error={Boolean(errors.letterDate)}
          helperText={errors.letterDate}
          disabled={disabled}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <TextField
          select
          fullWidth
          size="small"
          label={label('Ведомство', true)}
          value={values.sourceType}
          onChange={(e) => update('sourceType', e.target.value)}
          InputLabelProps={{ shrink: true }}
          SelectProps={{ displayEmpty: true }}
          error={Boolean(errors.sourceType)}
          helperText={errors.sourceType}
          disabled={disabled}
        >
          <MenuItem value="">
            <em>Не выбрано</em>
          </MenuItem>
          {SOURCE_TYPE_OPTIONS.map((option) => (
            <MenuItem key={option.code} value={option.code}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <TextField
          fullWidth
          size="small"
          label={label('Фамилия', true)}
          value={values.lastName}
          onChange={(e) => update('lastName', e.target.value)}
          error={Boolean(errors.lastName)}
          helperText={errors.lastName}
          disabled={disabled}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <TextField
          fullWidth
          size="small"
          label={label('Имя', true)}
          value={values.firstName}
          onChange={(e) => update('firstName', e.target.value)}
          error={Boolean(errors.firstName)}
          helperText={errors.firstName}
          disabled={disabled}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <TextField
          fullWidth
          size="small"
          label="Отчество"
          value={values.patronymic}
          onChange={(e) => update('patronymic', e.target.value)}
          disabled={disabled}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <TextField
          fullWidth
          size="small"
          type="date"
          label={label('Дата рождения', true)}
          value={values.birthDate}
          onChange={(e) => update('birthDate', e.target.value)}
          InputLabelProps={{ shrink: true }}
          error={Boolean(errors.birthDate)}
          helperText={errors.birthDate}
          disabled={disabled}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <TextField
          select
          fullWidth
          size="small"
          label={label('Пол', true)}
          value={values.gender}
          onChange={(e) => update('gender', e.target.value)}
          InputLabelProps={{ shrink: true }}
          SelectProps={{ displayEmpty: true }}
          error={Boolean(errors.gender)}
          helperText={errors.gender}
          disabled={disabled}
        >
          <MenuItem value="">
            <em>Не выбрано</em>
          </MenuItem>
          {GENDER_OPTIONS.map((option) => (
            <MenuItem key={option.code} value={option.code}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <TextField
          fullWidth
          size="small"
          label={label('Серия паспорта', true)}
          value={values.identityDocumentSeries}
          onChange={(e) => update('identityDocumentSeries', e.target.value)}
          error={Boolean(errors.identityDocumentSeries)}
          helperText={errors.identityDocumentSeries}
          disabled={disabled}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <TextField
          fullWidth
          size="small"
          label="Номер паспорта"
          value={values.identityDocumentNumber}
          onChange={(e) => update('identityDocumentNumber', e.target.value)}
          disabled={disabled}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <TextField
          fullWidth
          size="small"
          type="date"
          label="Дата выдачи паспорта"
          value={values.identityDocumentIssueDate}
          onChange={(e) => update('identityDocumentIssueDate', e.target.value)}
          InputLabelProps={{ shrink: true }}
          disabled={disabled}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <TextField
          fullWidth
          size="small"
          label="ИНН"
          value={values.itn}
          onChange={(e) => update('itn', e.target.value)}
          disabled={disabled}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <TextField
          fullWidth
          size="small"
          label="СНИЛС"
          value={values.insuranceNumber}
          onChange={(e) => update('insuranceNumber', e.target.value)}
          disabled={disabled}
        />
      </Grid>
    </Grid>
  );
}
