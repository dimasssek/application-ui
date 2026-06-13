import ClearIcon from '@mui/icons-material/Clear';
import {
  Autocomplete,
  Box,
  CircularProgress,
  Divider,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import type { ReportDefinition } from '../../types/report';
import { RequiredFieldLabel } from './RequiredFieldLabel';
import { ReportSectionCard, ReportSectionCardBody } from './ReportSectionCard';

type ReportSelectorCardProps = {
  reports: ReportDefinition[];
  loading: boolean;
  value: ReportDefinition | null;
  onChange: (report: ReportDefinition | null) => void;
};

export function ReportSelectorCard({
  reports,
  loading,
  value,
  onChange,
}: ReportSelectorCardProps) {
  return (
    <ReportSectionCard>
      <Typography variant="h5" component="h2" color="text.secondary">
        Выберите отчёт
      </Typography>
      <Divider sx={{ mt: 1.5 }} />

      <ReportSectionCardBody>
        <RequiredFieldLabel>Наименование отчёта</RequiredFieldLabel>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
          <Autocomplete
            fullWidth
            loading={loading}
            options={reports}
            value={value}
            onChange={(_, report) => onChange(report)}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(a, b) => a.code === b.code}
            noOptionsText="Нет доступных отчётов"
            loadingText="Загрузка отчётов…"
            renderInput={(params) => (
              <TextField
                {...params}
                required
                placeholder="Выберите значение"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? (
                        <CircularProgress color="inherit" size={18} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
          <IconButton
            aria-label="Очистить выбор отчёта"
            onClick={() => onChange(null)}
            disabled={!value}
            sx={{ mt: 0.5, color: 'primary.main' }}
          >
            <ClearIcon fontSize="small" />
          </IconButton>
        </Box>
      </ReportSectionCardBody>
    </ReportSectionCard>
  );
}
