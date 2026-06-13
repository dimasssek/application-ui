import { TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import { generateReport } from '../../../api/reportsApi';
import type { ReportParamsComponentProps } from '../../../types/report';
import { ReportFormShell } from '../ReportFormShell';
import { RequiredFieldLabel } from '../RequiredFieldLabel';

type ParamsState = {
  dateFrom: string;
  dateTo: string;
};

const EMPTY_PARAMS: ParamsState = {
  dateFrom: '',
  dateTo: '',
};

function isValid(params: ParamsState) {
  return Boolean(params.dateFrom.trim() && params.dateTo.trim());
}

/** Параметры отчёта «Сведения о кредитных продуктах физических лиц». */
export function CreditProductsParams({ report }: ReportParamsComponentProps) {
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
      </Grid>
    </ReportFormShell>
  );
}
