import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Link,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import {
  getClient,
  getClientHistory,
  updateClient,
} from '../../api/databaseClientApi';
import { ApiError } from '../../api/httpClient';
import { ClientForm } from '../../components/database/clients/ClientForm';
import {
  clientToFormValues,
  formValuesToUpdateRequest,
  validateClientForm,
  type ClientFormValues,
} from '../../components/database/clients/clientFormState';
import {
  DATABASE_HUB_TITLE,
  DATABASE_SECTIONS,
} from '../../navigation/databaseSections';
import { ROUTES } from '../../navigation/routes';
import type { ClientHistoryEntryTo } from '../../types/client';
import {
  lookupLabel,
  REQUEST_OUTCOME_LABELS,
  REQUEST_STATUS_LABELS,
  SOURCE_TYPE_LABELS,
} from '../../types/client/enums';

const section = DATABASE_SECTIONS.find((item) => item.id === 'clientSearch')!;

function formatDateTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleString('ru-RU');
}

export function ClientEditPage() {
  const { clientId = '' } = useParams<{ clientId: string }>();
  const navigate = useNavigate();

  const [values, setValues] = useState<ClientFormValues | null>(null);
  const [history, setHistory] = useState<ClientHistoryEntryTo[]>([]);
  const [errors, setErrors] = useState<ReturnType<typeof validateClientForm>['errors']>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    if (!clientId) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const [client, historyEntries] = await Promise.all([
        getClient(clientId),
        getClientHistory(clientId),
      ]);
      setValues(clientToFormValues(client));
      setHistory(historyEntries);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Не удалось загрузить данные клиента.');
      }
    } finally {
      setLoading(false);
    }
  }, [clientId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSubmit = async () => {
    if (!values || !clientId) {
      return;
    }
    const { valid, errors: nextErrors } = validateClientForm(values);
    setErrors(nextErrors);
    if (!valid) {
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccessMessage(null);
    try {
      await updateClient(clientId, formValuesToUpdateRequest(values));
      setSuccessMessage('Изменения сохранены.');
      await loadData();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Не удалось сохранить изменения.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!values) {
    return (
      <Alert severity="error">
        {error ?? 'Клиент не найден.'}
        <Button sx={{ ml: 2 }} onClick={() => navigate(ROUTES.databaseClientSearch)}>
          К поиску
        </Button>
      </Alert>
    );
  }

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
          to={ROUTES.databaseClientSearch}
          underline="hover"
        >
          {section.title}
        </Link>
        {' » '}
        Редактирование
      </Typography>

      <Typography variant="h5" component="h1" gutterBottom>
        Редактирование клиента
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      {successMessage && (
        <Alert
          severity="success"
          sx={{ mb: 2 }}
          onClose={() => setSuccessMessage(null)}
        >
          {successMessage}
        </Alert>
      )}

      <ClientForm
        values={values}
        errors={errors}
        onChange={setValues}
        disabled={submitting}
      />

      <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
        <Button
          component={RouterLink}
          to={ROUTES.databaseClientSearch}
          disabled={submitting}
        >
          Отмена
        </Button>
        <Button variant="contained" onClick={handleSubmit} disabled={submitting}>
          {submitting ? <CircularProgress size={22} color="inherit" /> : 'Сохранить'}
        </Button>
      </Stack>

      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        История межведомственных запросов
      </Typography>

      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Номер запроса</TableCell>
              <TableCell>Источник</TableCell>
              <TableCell>Статус запроса</TableCell>
              <TableCell>Дата создания</TableCell>
              <TableCell>Итог</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                    История запросов пуста.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              history.map((entry) => (
                <TableRow key={entry.requestId}>
                  <TableCell>{entry.letterNumber}</TableCell>
                  <TableCell>
                    {lookupLabel(SOURCE_TYPE_LABELS, entry.sourceType)}
                  </TableCell>
                  <TableCell>
                    {lookupLabel(REQUEST_STATUS_LABELS, entry.requestStatus)}
                  </TableCell>
                  <TableCell>
                    {formatDateTime(entry.externalRequestCreated)}
                  </TableCell>
                  <TableCell>
                    {lookupLabel(REQUEST_OUTCOME_LABELS, entry.outcome)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
