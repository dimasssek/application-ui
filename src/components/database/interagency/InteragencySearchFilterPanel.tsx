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
import type { ExternalRequestSearchFilters } from '../../../types/externalRequest';
import {
  REQUEST_STATUS_OPTIONS,
  SOURCE_TYPE_OPTIONS,
} from '../../../types/client/enums';

type InteragencySearchFilterPanelProps = {
  open: boolean;
  values: ExternalRequestSearchFilters;
  onChange: (values: ExternalRequestSearchFilters) => void;
  onApply: () => void;
  onReset: () => void;
};

export function InteragencySearchFilterPanel({
  open,
  values,
  onChange,
  onApply,
  onReset,
}: InteragencySearchFilterPanelProps) {
  const updateField = <K extends keyof ExternalRequestSearchFilters>(
    key: K,
    value: ExternalRequestSearchFilters[K]
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
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              size="small"
              label="Номер запроса"
              value={values.letterNumber}
              onChange={(event) => updateField('letterNumber', event.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              size="small"
              type="date"
              label="Дата запроса"
              value={values.letterDate}
              onChange={(event) => updateField('letterDate', event.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              select
              fullWidth
              size="small"
              label="Ведомство"
              value={values.sourceType}
              onChange={(event) => updateField('sourceType', event.target.value)}
              InputLabelProps={{ shrink: true }}
              SelectProps={{ displayEmpty: true }}
            >
              <MenuItem value="">
                <em>Любое</em>
              </MenuItem>
              {SOURCE_TYPE_OPTIONS.map((option) => (
                <MenuItem key={option.code} value={option.code}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 0.75 }}
            >
              Статусы
            </Typography>
            <MultiSelectField
              value={values.statuses}
              options={REQUEST_STATUS_OPTIONS}
              onChange={(next) => updateField('statuses', next)}
              placeholder="Любой"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              size="small"
              label="Инициатор"
              value={values.initiatorLogin}
              onChange={(event) =>
                updateField('initiatorLogin', event.target.value)
              }
            />
          </Grid>
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
