import {
  Alert,
  Button,
  Link,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { runGeneralCheck } from '../../api/applications/runApi';
import { APPLICATIONS_HUB_TITLE } from '../../navigation/applicationSections';
import { ROUTES } from '../../navigation/routes';
import {
  APPLICATION_TYPE_OPTIONS,
  lookupLabel,
  STATUS_BUSINESS_LABELS,
} from '../../types/applications/enums';
import type { ApplicationType } from '../../types/applications/enums';

export function ApplicationsRunPage() {
  const [date, setDate] = useState('');
  const [applicationType, setApplicationType] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [info, setInfo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = Boolean(date && applicationType) && !submitting;

  const handleSubmit = async () => {
    setError(null);
    setInfo(null);
    setSubmitting(true);
    try {
      const response = await runGeneralCheck({
        applicationType: applicationType as ApplicationType,
        dateTo: `${date}T23:59:59+00:00`,
      });

      const statusSummary = Object.entries(response.statusCounts ?? {})
        .filter(([, count]) => count > 0)
        .map(
          ([status, count]) =>
            `${lookupLabel(STATUS_BUSINESS_LABELS, status)}: ${count}`
        )
        .join(', ');

      setInfo(
        `Обработано заявлений: ${response.processedCount}` +
          (statusSummary ? `. Статусы: ${statusSummary}.` : '.')
      );
    } catch {
      setError('Не удалось запустить обработку. Повторите попытку позже.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)',
      }}
    >
      <Typography variant="body2" sx={{ mb: 2 }}>
        <Link component={RouterLink} to={ROUTES.applications} underline="hover">
          {APPLICATIONS_HUB_TITLE}
        </Link>
        {' » '}
        Запуск обработки
      </Typography>

      <Typography variant="h5" component="h1" gutterBottom>
        Запуск обработки
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Выберите дату и тип заявления для пакетной обработки заявлений в очереди.
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            size="small"
            type="date"
            label="Дата создания по *"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            select
            fullWidth
            size="small"
            label="Тип заявления *"
            value={applicationType}
            onChange={(event) => setApplicationType(event.target.value)}
            InputLabelProps={{ shrink: true }}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value="">
              <em>Не выбрано</em>
            </MenuItem>
            {APPLICATION_TYPE_OPTIONS.map((option) => (
              <MenuItem key={option.code} value={option.code}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
        <Button
          variant="contained"
          disabled={!canSubmit}
          onClick={handleSubmit}
        >
          Обработать
        </Button>
      </Stack>

      {info && (
        <Alert severity="success" sx={{ mt: 3 }} onClose={() => setInfo(null)}>
          {info}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mt: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
    </Paper>
  );
}
