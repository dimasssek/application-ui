import {
  Alert,
  Button,
  CircularProgress,
  Link,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  createExternalRequestManual,
  getExternalRequestDetailPath,
} from '../../api/externalRequestApi';
import { ApiError } from '../../api/httpClient';
import { InteragencyManualForm } from '../../components/database/interagency/InteragencyManualForm';
import {
  EMPTY_INTERAGENCY_MANUAL_FORM_VALUES,
  interagencyManualFormToRequest,
  validateInteragencyManualForm,
} from '../../components/database/interagency/interagencyFormState';
import { INITIATOR_LOGIN } from '../../config/initiatorLogin';
import {
  DATABASE_HUB_TITLE,
  DATABASE_SECTIONS,
} from '../../navigation/databaseSections';
import { ROUTES } from '../../navigation/routes';

const section = DATABASE_SECTIONS.find((item) => item.id === 'interagency')!;

export function InteragencyManualCreatePage() {
  const navigate = useNavigate();
  const [values, setValues] = useState(EMPTY_INTERAGENCY_MANUAL_FORM_VALUES);
  const [errors, setErrors] = useState<
    ReturnType<typeof validateInteragencyManualForm>['errors']
  >({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    const { valid, errors: nextErrors } = validateInteragencyManualForm(values);
    setErrors(nextErrors);
    if (!valid) {
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const created = await createExternalRequestManual(
        interagencyManualFormToRequest(values, INITIATOR_LOGIN)
      );
      navigate(getExternalRequestDetailPath(created.id));
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Не удалось создать ручной запрос.');
      }
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
        Ручной запрос
      </Typography>

      <Typography variant="h5" component="h1" gutterBottom>
        Новый ручной запрос
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Запрос по данным клиента без записи в базе банка.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <InteragencyManualForm
        values={values}
        errors={errors}
        onChange={setValues}
        disabled={submitting}
      />

      <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
        <Button
          component={RouterLink}
          to={ROUTES.databaseInteragency}
          disabled={submitting}
        >
          Отмена
        </Button>
        <Button variant="contained" onClick={handleSubmit} disabled={submitting}>
          {submitting ? (
            <CircularProgress size={22} color="inherit" />
          ) : (
            'Создать'
          )}
        </Button>
      </Stack>
    </Paper>
  );
}
