import { Box, Paper, Typography } from '@mui/material';
import type { ExternalRequestSummaryTo } from '../../../types/externalRequest';

const SUMMARY_ITEMS: Array<{
  key: keyof ExternalRequestSummaryTo;
  label: string;
}> = [
  { key: 'pendingCount', label: 'Ожидает' },
  { key: 'updatedCount', label: 'Обновлено' },
  { key: 'actualCount', label: 'Актуально' },
  { key: 'notFoundCount', label: 'Не найдено' },
  { key: 'errorCount', label: 'Ошибки' },
];

type ExternalRequestSummaryPanelProps = {
  summary: ExternalRequestSummaryTo | null;
};

export function ExternalRequestSummaryPanel({
  summary,
}: ExternalRequestSummaryPanelProps) {
  if (!summary) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        mb: 3,
      }}
    >
      {SUMMARY_ITEMS.map((item) => (
        <Paper
          key={item.key}
          variant="outlined"
          sx={{ p: 2, textAlign: 'center', minWidth: 120, flex: '1 1 120px' }}
        >
          <Typography variant="h6">{summary[item.key]}</Typography>
          <Typography variant="body2" color="text.secondary">
            {item.label}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
}
