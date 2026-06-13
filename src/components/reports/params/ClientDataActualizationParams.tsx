import { MenuItem, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import { generateReport } from '../../../api/reportsApi';
import type { ReportParamsComponentProps } from '../../../types/report';
import {
  DEPARTMENT_DEFAULT,
  DEPARTMENT_OPTIONS,
} from '../reportDictionaries';
import { ReportFormShell } from '../ReportFormShell';
import { RequiredFieldLabel } from '../RequiredFieldLabel';

type ParamsState = {
  dateFrom: string;
  dateTo: string;
  department: string;
};

const EMPTY_PARAMS: ParamsState = {
  dateFrom: '',
  dateTo: '',
  department: DEPARTMENT_DEFAULT,
};

function isValid(params: ParamsState) {
  return Boolean(
    params.dateFrom.trim() && params.dateTo.trim() && params.department.trim()
  );
}

/** Параметры отчёта «Сведения об актуализации клиентских данных через внешние ведомства». */
export function ClientDataActualizationParams({
  report,
}: ReportParamsComponentProps) {
  const [params, setParams] = useState<ParamsState>(EMPTY_PARAMS);

  const update = <K extends keyof ParamsState>(
    key: K,
    value: ParamsState[K]
  ) => {
    setParams((current) => ({ ...current, [key]: value }));
  };

  const handleClear = () => {
    setParams(EMPTY_PARAMS);
  };

  const handleGenerate = () => {
    if (!isValid(params)) {
      return;
    }
    // Заглушка: реальный вызов будет позже.
    void generateReport(report.code, params);
  };

  return (
    <ReportFormShell
      report={report}
      onClear={handleClear}
      onGenerate={handleGenerate}
      generateDisabled={!isValid(params)}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <RequiredFieldLabel>Дата с</RequiredFieldLabel>
          <TextField
            fullWidth
            size="small"
            type="date"
            value={params.dateFrom}
            onChange={(event) => update('dateFrom', event.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <RequiredFieldLabel>Дата по</RequiredFieldLabel>
          <TextField
            fullWidth
            size="small"
            type="date"
            value={params.dateTo}
            onChange={(event) => update('dateTo', event.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <RequiredFieldLabel>Ведомство-получатель</RequiredFieldLabel>
          <TextField
            select
            fullWidth
            size="small"
            value={params.department}
            onChange={(event) => update('department', event.target.value)}
            InputLabelProps={{ shrink: true }}
          >
            {DEPARTMENT_OPTIONS.map((option) => (
              <MenuItem key={option.code} value={option.code}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </ReportFormShell>
  );
}
