import { Button, Divider, Stack, Typography } from '@mui/material';
import type { ReportParamsComponentProps } from '../../../types/report';
import { ReportSectionCard, ReportSectionCardBody } from '../ReportSectionCard';

export function GenericReportParams({ report }: ReportParamsComponentProps) {
  const handleGenerate = () => {
    // Запрос на построение отчёта будет добавлен позже.
  };

  return (
    <ReportSectionCard>
      <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
        {report.name}
      </Typography>
      <Divider sx={{ mt: 1.5 }} />

      <ReportSectionCardBody>
        <Typography variant="body2" color="text.secondary">
          Параметры для отчёта с кодом «{report.code}» будут добавлены позже.
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-end"
          sx={{ mt: 3, pr: { md: 2 } }}
        >
          <Button variant="contained" onClick={handleGenerate}>
            Сформировать отчёт
          </Button>
        </Stack>
      </ReportSectionCardBody>
    </ReportSectionCard>
  );
}
