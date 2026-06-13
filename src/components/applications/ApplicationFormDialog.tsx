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

export type ApplicationFormMode = 'create' | 'edit';

type ApplicationFormDialogProps<TDto extends Record<string, unknown>> = {
  open: boolean;
  mode: ApplicationFormMode;
  title: string;
  fields: FieldConfig<keyof TDto & string>[];
  initialValues: Partial<TDto>;
  submitting?: boolean;
  onClose: () => void;
  onSubmit: (values: TDto) => void;
};

type Errors = Record<string, string>;

export function ApplicationFormDialog<TDto extends Record<string, unknown>>({
  open,
  mode,
  title,
  fields,
  initialValues,
  submitting = false,
  onClose,
  onSubmit,
}: ApplicationFormDialogProps<TDto>) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Errors>({});

  const initialAsStrings = useMemo(
    () => toStringMap(initialValues),
    [initialValues]
  );

  useEffect(() => {
    if (open) {
      setValues(initialAsStrings);
      setErrors({});
    }
  }, [open, initialAsStrings]);

  const dialogTitle =
    mode === 'create' ? `Новое заявление — ${title}` : `Редактирование — ${title}`;

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
    const nextErrors: Errors = {};
    fields.forEach((field) => {
      if (field.required && !field.readOnly) {
        const raw = (values[field.key] ?? '').trim();
        if (!raw) {
          nextErrors[field.key] = 'Обязательное поле';
        }
      }
    });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }
    onSubmit(buildPayload<TDto>(initialValues, values));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent dividers>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {mode === 'create'
            ? 'Заполните поля заявления. Новое заявление будет создано в статусе «В очереди».'
            : 'При сохранении заявление остаётся в статусе «В очереди».'}
        </Typography>
        <Grid container spacing={2}>
          {fields.map((field) => (
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

function renderFormField<TKey extends string>(
  field: FieldConfig<TKey>,
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

function toStringMap(
  source: Record<string, unknown>
): Record<string, string> {
  return Object.entries(source).reduce<Record<string, string>>(
    (acc, [key, value]) => {
      acc[key] = value == null ? '' : String(value);
      return acc;
    },
    {}
  );
}

function buildPayload<TDto extends Record<string, unknown>>(
  initial: Partial<TDto>,
  values: Record<string, string>
): TDto {
  const payload: Record<string, unknown> = { ...initial };
  Object.entries(values).forEach(([key, value]) => {
    if (value === '') {
      // closed_date может быть пустым => null
      payload[key] = key === 'closed_date' ? null : '';
    } else {
      payload[key] = value;
    }
  });
  return payload as TDto;
}
