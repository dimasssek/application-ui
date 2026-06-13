import { Button, Divider, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';
import type { ReportDefinition } from '../../types/report';
import { ReportSectionCard, ReportSectionCardBody } from './ReportSectionCard';

type ReportFormShellProps = {
  report: ReportDefinition;
  children: ReactNode;
  onClear: () => void;
  onGenerate: () => void;
  generateDisabled?: boolean;
  /** Доп. сообщение/алёрт под формой (например, статус генерации). */
  footer?: ReactNode;
};

/**
 * Общий каркас формы параметров отчёта: заголовок с названием,
 * разделитель, поля и стандартные кнопки «Очистить»/«Сформировать отчёт».
 */
export function ReportFormShell({
  report,
  children,
  onClear,
  onGenerate,
  generateDisabled,
  footer,
}: ReportFormShellProps) {
  return (
    <ReportSectionCard>
      <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
        {report.name}
      </Typography>
      <Divider sx={{ mt: 1.5 }} />

      <ReportSectionCardBody>
        {children}

        <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-end"
          sx={{ mt: 3, pr: { md: 2 } }}
        >
          <Button variant="outlined" onClick={onClear}>
            Очистить
          </Button>
          <Button
            variant="contained"
            onClick={onGenerate}
            disabled={generateDisabled}
          >
            Сформировать отчёт
          </Button>
        </Stack>

        {footer}
      </ReportSectionCardBody>
    </ReportSectionCard>
  );
}
