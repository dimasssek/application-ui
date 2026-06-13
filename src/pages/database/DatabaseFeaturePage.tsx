import { Alert, CircularProgress, Paper, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import {
  DATABASE_HUB_TITLE,
  type DatabaseSection,
} from '../../navigation/databaseSections';
import { ROUTES } from '../../navigation/routes';

type DatabaseFeaturePageProps = {
  section: DatabaseSection;
  loadData: () => Promise<unknown>;
  resultLabel?: string;
};

export function DatabaseFeaturePage({
  section,
  loadData,
  resultLabel = 'Данные получены (заглушка API).',
}: DatabaseFeaturePageProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    setLoaded(false);
    try {
      await loadData();
      setLoaded(true);
    } catch {
      setError('Не удалось загрузить данные. Повторите попытку позже.');
    } finally {
      setLoading(false);
    }
  }, [loadData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
        <Link component={RouterLink} to={ROUTES.database} underline="hover">
          {DATABASE_HUB_TITLE}
        </Link>
        {' » '}
        {section.title}
      </Typography>

      <Typography variant="h5" component="h1" gutterBottom>
        {section.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {section.description}
      </Typography>

      {loading && (
        <CircularProgress size={28} aria-label="Загрузка" sx={{ display: 'block' }} />
      )}

      {error && (
        <Alert severity="error" sx={{ mt: loading ? 2 : 0 }}>
          {error}
        </Alert>
      )}

      {loaded && !error && (
        <Alert severity="info">{resultLabel}</Alert>
      )}
    </Paper>
  );
}
