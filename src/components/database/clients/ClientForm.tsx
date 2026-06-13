import {
  Checkbox,
  FormControlLabel,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { GENDER_OPTIONS } from '../../../types/client/enums';
import type { ClientFormErrors, ClientFormValues } from './clientFormState';

type ClientFormProps = {
  values: ClientFormValues;
  errors: ClientFormErrors;
  onChange: (values: ClientFormValues) => void;
  disabled?: boolean;
};

function fieldLabel(label: string, required?: boolean) {
  return required ? `${label} *` : label;
}

export function ClientForm({
  values,
  errors,
  onChange,
  disabled = false,
}: ClientFormProps) {
  const update = <K extends keyof ClientFormValues>(
    key: K,
    value: ClientFormValues[K]
  ) => {
    onChange({ ...values, [key]: value });
  };

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 4 }}>
        <TextField
          fullWidth
          size="small"
          label={fieldLabel('Фамилия', true)}
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
          label={fieldLabel('Имя', true)}
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
          label={fieldLabel('Дата рождения', true)}
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
          label={fieldLabel('Пол', true)}
          value={values.gender}
          onChange={(e) => update('gender', e.target.value)}
          InputLabelProps={{ shrink: true }}
          error={Boolean(errors.gender)}
          helperText={errors.gender}
          disabled={disabled}
        >
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
          label={fieldLabel('Серия паспорта', true)}
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

      <Grid size={{ xs: 12 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={values.addressDefined}
              onChange={(e) => update('addressDefined', e.target.checked)}
              disabled={disabled}
            />
          }
          label="Адрес определён"
        />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <TextField
          fullWidth
          size="small"
          label={fieldLabel('Адрес места жительства', true)}
          value={values.residenceAddressName}
          onChange={(e) => update('residenceAddressName', e.target.value)}
          error={Boolean(errors.residenceAddressName)}
          helperText={errors.residenceAddressName}
          disabled={disabled}
        />
      </Grid>

      <Grid size={12}>
        <Typography variant="caption" color="text.secondary">
          Поля, отмеченные *, обязательны для заполнения.
        </Typography>
      </Grid>
    </Grid>
  );
}
