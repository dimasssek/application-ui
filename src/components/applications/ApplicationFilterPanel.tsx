import {
  Button,
  Collapse,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import type { FieldConfig } from '../../types/applications/registry';

type ApplicationFilterPanelProps<TFilters extends Record<string, string>> = {
  open: boolean;
  values: TFilters;
  fields: FieldConfig<keyof TFilters & string>[];
  onChange: (values: TFilters) => void;
  onApply: () => void;
  onReset: () => void;
};

export function ApplicationFilterPanel<
  TFilters extends Record<string, string>,
>({
  open,
  values,
  fields,
  onChange,
  onApply,
  onReset,
}: ApplicationFilterPanelProps<TFilters>) {
  const updateField = (key: keyof TFilters & string, value: string) => {
    onChange({ ...values, [key]: value });
  };

  return (
    <Collapse in={open}>
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          mb: 2,
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary' }}>
          Параметры поиска
        </Typography>

        <Grid container spacing={2}>
          {fields.map((field) => (
            <Grid key={field.key} size={field.gridSize ?? { xs: 12, md: 4 }}>
              {renderField(field, values[field.key], (value) =>
                updateField(field.key, value)
              )}
            </Grid>
          ))}
        </Grid>

        <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-end"
          sx={{ mt: 3 }}
        >
          <Button variant="outlined" onClick={onReset}>
            Сбросить все фильтры
          </Button>
          <Button variant="contained" onClick={onApply}>
            Применить
          </Button>
        </Stack>
      </Paper>
    </Collapse>
  );
}

function renderField<TKey extends string>(
  field: FieldConfig<TKey>,
  value: string,
  onChange: (value: string) => void
) {
  if (field.type === 'select') {
    return (
      <TextField
        select
        fullWidth
        size="small"
        label={field.label}
        value={value ?? ''}
        onChange={(event) => onChange(event.target.value)}
        InputLabelProps={{ shrink: true }}
        SelectProps={{ displayEmpty: true }}
      >
        <MenuItem value="">
          <em>Любое</em>
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
        label={field.label}
        value={value ?? ''}
        onChange={(event) => onChange(event.target.value)}
        InputLabelProps={{ shrink: true }}
      />
    );
  }

  if (field.type === 'textarea') {
    return (
      <TextField
        fullWidth
        size="small"
        multiline
        minRows={2}
        label={field.label}
        value={value ?? ''}
        onChange={(event) => onChange(event.target.value)}
      />
    );
  }

  return (
    <TextField
      fullWidth
      size="small"
      label={field.label}
      value={value ?? ''}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}
