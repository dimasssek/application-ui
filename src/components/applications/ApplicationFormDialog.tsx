import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useEffect, useMemo, useState } from 'react';
import type { FieldConfig } from '../../types/applications/registry';
import {
  buildFormPayload,
  dtoToFormValues,
  filterFormFields,
  validateFormValues,
  type ApplicationFormMode,
} from './applicationFormState';

export type { ApplicationFormMode };

type ApplicationFormDialogProps = {
  open: boolean;
  mode: ApplicationFormMode;
  title: string;
  fields: FieldConfig[];
  initialValues: Record<string, unknown>;
  submitting?: boolean;
  onClose: () => void;
  onSubmit: (payload: Record<string, unknown>) => void;
};

export function ApplicationFormDialog({
  open,
  mode,
  title,
  fields,
  initialValues,
  submitting = false,
  onClose,
  onSubmit,
}: ApplicationFormDialogProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const visibleFields = useMemo(
    () => filterFormFields(fields, mode),
    [fields, mode]
  );

  const initialAsStrings = useMemo(
    () => dtoToFormValues(initialValues),
    [initialValues]
  );

  useEffect(() => {
    if (open) {
      setValues(initialAsStrings);
      setErrors({});
    }
  }, [open, initialAsStrings]);

  const dialogTitle =
    mode === 'create'
      ? `Новое заявление — ${title}`
      : `Редактирование — ${title}`;

  const handleChange = (key: string, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    if (errors[key]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[key];
        return next;
      });
    }
  };

  const handleSubmit = () => {
    const nextErrors = validateFormValues(visibleFields, values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }
    onSubmit(buildFormPayload(fields, mode, values));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent dividers>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {mode === 'create'
            ? 'Заполните поля заявления. Новое заявление будет создано в статусе «В очереди».'
            : 'Редактирование доступно только для заявлений в статусе «В очереди».'}
        </Typography>
        <Grid container spacing={2}>
          {visibleFields.map((field) => (
            <Grid key={field.key} size={field.gridSize ?? { xs: 12, md: 6 }}>
              {renderFormField(
                field,
                values[field.key] ?? '',
                (value) => handleChange(field.key, value),
                errors[field.key]
              )}
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={submitting}>
          Отмена
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {mode === 'create' ? 'Создать' : 'Сохранить'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function renderFormField(
  field: FieldConfig,
  value: string,
  onChange: (value: string) => void,
  error: string | undefined
) {
  const labelWithMark = field.required ? `${field.label} *` : field.label;

  if (field.type === 'select') {
    return (
      <TextField
        select
        fullWidth
        size="small"
        label={labelWithMark}
        value={value ?? ''}
        onChange={(event) => onChange(event.target.value)}
        error={Boolean(error)}
        helperText={error}
        disabled={field.readOnly}
        InputLabelProps={{ shrink: true }}
        SelectProps={{ displayEmpty: true }}
      >
        <MenuItem value="">
          <em>Не выбрано</em>
        </MenuItem>
        {(field.options ?? []).map((option) => (
          <MenuItem key={option.code} value={option.code}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    );
  }

  if (field.type === 'date' || field.type === 'datetime-local') {
    return (
      <TextField
        fullWidth
        size="small"
        type={field.type}
        label={labelWithMark}
        value={value ?? ''}
        onChange={(event) => onChange(event.target.value)}
        InputLabelProps={{ shrink: true }}
        error={Boolean(error)}
        helperText={error}
        disabled={field.readOnly}
      />
    );
  }

  if (field.type === 'number') {
    return (
      <TextField
        fullWidth
        size="small"
        type="number"
        label={labelWithMark}
        value={value ?? ''}
        onChange={(event) => onChange(event.target.value)}
        error={Boolean(error)}
        helperText={error}
        disabled={field.readOnly}
        inputProps={{ min: 0 }}
      />
    );
  }

  if (field.type === 'textarea') {
    return (
      <TextField
        fullWidth
        size="small"
        multiline
        minRows={3}
        label={labelWithMark}
        value={value ?? ''}
        onChange={(event) => onChange(event.target.value)}
        error={Boolean(error)}
        helperText={error}
        disabled={field.readOnly}
      />
    );
  }

  return (
    <TextField
      fullWidth
      size="small"
      label={labelWithMark}
      value={value ?? ''}
      onChange={(event) => onChange(event.target.value)}
      error={Boolean(error)}
      helperText={error}
      disabled={field.readOnly}
    />
  );
}
