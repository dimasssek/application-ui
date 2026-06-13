import {
  Box,
  Button,
  Collapse,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import type { ClientSearchFilters } from '../../../types/client';
import { CLIENT_FILTER_FIELDS } from './clientTableColumns';

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
  const updateField = (key: keyof ClientSearchFilters, value: string) => {
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
              <TextField
                fullWidth
                size="small"
                label={field.label}
                type={field.type === 'text' ? 'text' : field.type}
                value={values[field.key]}
                onChange={(event) =>
                  updateField(field.key, event.target.value)
                }
                InputLabelProps={
                  field.type === 'date' || field.type === 'datetime-local'
                    ? { shrink: true }
                    : undefined
                }
              />
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
