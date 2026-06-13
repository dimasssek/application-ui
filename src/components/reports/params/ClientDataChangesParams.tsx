import { MenuItem, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import { generateReport } from '../../../api/reportsApi';
import type { ReportParamsComponentProps } from '../../../types/report';
import { MultiSelectField } from '../MultiSelectField';
import {
  APPLICATION_STATUS_OPTIONS,
  CLIENT_DATA_CHANGE_TYPE_OPTIONS,
  REPORT_FORM_CODE,
  REPORT_FORM_OPTIONS,
} from '../reportDictionaries';
import { ReportFormShell } from '../ReportFormShell';
import { RequiredFieldLabel } from '../RequiredFieldLabel';

type ParamsState = {
  /** Форма отчёта: STATISTIC | DETAILED. Пустая строка = ещё не выбрана. */
  form: string;
  dateFrom: string;
  dateTo: string;
  /** Только для детализированной формы. */
  types: string[];
  /** Только для детализированной формы. */
  statuses: string[];
};

const EMPTY_PARAMS: ParamsState = {
  form: '',
  dateFrom: '',
  dateTo: '',
  types: [],
  statuses: [],
};

function isValid(params: ParamsState) {
  if (!params.form) {
    return false;
  }
  const datesOk = Boolean(params.dateFrom.trim() && params.dateTo.trim());

  if (params.form === REPORT_FORM_CODE.STATISTIC) {
    return datesOk;
  }

  if (params.form === REPORT_FORM_CODE.DETAILED) {
    return (
      datesOk && params.types.length > 0 && params.statuses.length > 0
    );
  }

  return false;
}

/**
 * Параметры отчёта «Сведения об изменении клиентских данных».
 *
 * Сначала выбирается форма (статистическая/детализированная).
 * Пока форма не выбрана — остальные поля не показываем.
 */
export function ClientDataChangesParams({
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

  const formChosen = Boolean(params.form);
  const detailed = params.form === REPORT_FORM_CODE.DETAILED;

  return (
    <ReportFormShell
      report={report}
      onClear={handleClear}
      onGenerate={handleGenerate}
      generateDisabled={!isValid(params)}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <RequiredFieldLabel>Форма отчёта</RequiredFieldLabel>
          <TextField
            select
            fullWidth
            size="small"
            value={params.form}
            onChange={(event) => update('form', event.target.value)}
            InputLabelProps={{ shrink: true }}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value="">
              <em>Выберите значение</em>
            </MenuItem>
            {REPORT_FORM_OPTIONS.map((option) => (
              <MenuItem key={option.code} value={option.code}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      {formChosen && (
        <Grid container spacing={2} sx={{ mt: 0.5 }}>
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

          {detailed && (
            <>
              <Grid size={{ xs: 12, md: 6 }}>
                <RequiredFieldLabel>
                  Типы изменяемых данных
                </RequiredFieldLabel>
                <MultiSelectField
                  options={CLIENT_DATA_CHANGE_TYPE_OPTIONS}
                  value={params.types}
                  onChange={(next) => update('types', next)}
                  placeholder="Выберите значения"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <RequiredFieldLabel>
                  Бизнес-статусы заявления
                </RequiredFieldLabel>
                <MultiSelectField
                  options={APPLICATION_STATUS_OPTIONS}
                  value={params.statuses}
                  onChange={(next) => update('statuses', next)}
                  placeholder="Выберите значения"
                />
              </Grid>
            </>
          )}
        </Grid>
      )}
    </ReportFormShell>
  );
}
