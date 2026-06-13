import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Link,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { getExternalRequest } from '../../api/externalRequestApi';
import { ExternalRequestBatchesPanel } from '../../components/database/interagency/ExternalRequestBatchesPanel';
import { ExternalRequestSummaryPanel } from '../../components/database/interagency/ExternalRequestSummaryPanel';
import {
  DATABASE_HUB_TITLE,
  DATABASE_SECTIONS,
} from '../../navigation/databaseSections';
import { ROUTES } from '../../navigation/routes';
import type { ExternalRequestTo } from '../../types/externalRequest';
import {
  lookupLabel,
  REQUEST_STATUS,
  REQUEST_STATUS_LABELS,
  SOURCE_TYPE_LABELS,
} from '../../types/client/enums';

const section = DATABASE_SECTIONS.find((item) => item.id === 'interagency')!;

export function InteragencyDetailPage() {
  const { requestId = '' } = useParams();
  const [request, setRequest] = useState<ExternalRequestTo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRequest = useCallback(async () => {
    if (!requestId) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await getExternalRequest(requestId);
      setRequest(data);
    } catch {
      setError('Не удалось загрузить карточку запроса.');
      setRequest(null);
    } finally {
      setLoading(false);
    }
  }, [requestId]);

  useEffect(() => {
    loadRequest();
  }, [loadRequest]);

  useEffect(() => {
    if (!request || request.status !== REQUEST_STATUS.PROCESSING) {
      return;
    }
    const timer = window.setInterval(() => {
      loadRequest();
    }, 10000);
    return () => window.clearInterval(timer);
  }, [request, loadRequest]);

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
        <Link
          component={RouterLink}
          to={ROUTES.databaseInteragency}
          underline="hover"
        >
          {section.title}
        </Link>
        {' » '}
        Карточка запроса
      </Typography>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography variant="h5" component="h1">
          Межведомственный запрос
        </Typography>
        <Button variant="outlined" onClick={loadRequest} disabled={loading}>
          Обновить
        </Button>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading && !request ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      ) : request ? (
        <>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Номер запроса: {request.letterNumber}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Дата запроса: {request.letterDate}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ведомство:{' '}
              {lookupLabel(SOURCE_TYPE_LABELS, request.sourceType)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Статус: {lookupLabel(REQUEST_STATUS_LABELS, request.status)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Инициатор: {request.initiatorLogin}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Создан: {new Date(request.created).toLocaleString('ru-RU')}
            </Typography>
          </Box>

          <ExternalRequestSummaryPanel summary={request.summary} />

          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            Пачки и позиции
          </Typography>
          <ExternalRequestBatchesPanel batches={request.batches ?? []} />
        </>
      ) : null}
    </Paper>
  );
}
