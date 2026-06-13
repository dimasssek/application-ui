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
import { MultiSelectField } from '../../reports/MultiSelectField';
import type { ClientSearchFilters } from '../../../types/client';
import {
  CLIENT_FILTER_FIELDS,
  CLIENT_STATUS_OPTIONS,
  GENDER_OPTIONS,
} from './clientTableColumns';

type ClientSearchFilterPanelProps = {
  open: boolean;
  values: ClientSearchFilters;
  onChange: (values: ClientSearchFilters) => void;
  onApply: () => void;
  onReset: () => void;
};

export function ClientSearchFilterPanel({
  open,
  values,
  onChange,
  onApply,
  onReset,
}: ClientSearchFilterPanelProps) {
  const updateField = <K extends keyof ClientSearchFilters>(
    key: K,
    value: ClientSearchFilters[K]
  ) => {
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
          {CLIENT_FILTER_FIELDS.map((field) => (
            <Grid
              key={field.key}
              size={field.gridSize ?? { xs: 12, md: 4 }}
            >
              {field.type === 'select' ? (
                <TextField
                  select
                  fullWidth
                  size="small"
                  label={field.label}
                  value={values[field.key] as string}
                  onChange={(event) =>
                    updateField(field.key, event.target.value)
                  }
                  InputLabelProps={{ shrink: true }}
                  SelectProps={{ displayEmpty: true }}
                >
                  <MenuItem value="">
                    <em>Любое</em>
                  </MenuItem>
                  {GENDER_OPTIONS.map((option) => (
                    <MenuItem key={option.code} value={option.code}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              ) : field.type === 'statuses' ? (
                <>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 0.75 }}
                  >
                    {field.label}
                  </Typography>
                  <MultiSelectField
                    options={CLIENT_STATUS_OPTIONS}
                    value={values.statuses}
                    onChange={(next) => updateField('statuses', next)}
                    placeholder="Любой"
                  />
                </>
              ) : (
                <TextField
                  fullWidth
                  size="small"
                  label={field.label}
                  type={field.type === 'date' ? 'date' : 'text'}
                  value={values[field.key] as string}
                  onChange={(event) =>
                    updateField(field.key, event.target.value)
                  }
                  InputLabelProps={
                    field.type === 'date' ? { shrink: true } : undefined
                  }
                />
              )}
            </Grid>
          ))}
        </Grid>

        <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
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
