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
import { createClient } from '../../api/databaseClientApi';
import { ApiError } from '../../api/httpClient';
import {
  DATABASE_HUB_TITLE,
  DATABASE_SECTIONS,
} from '../../navigation/databaseSections';
import { ROUTES } from '../../navigation/routes';
import { ClientForm } from '../../components/database/clients/ClientForm';
import {
  EMPTY_CLIENT_FORM_VALUES,
  formValuesToCreateRequest,
  validateClientForm,
  type ClientFormValues,
} from '../../components/database/clients/clientFormState';

const section = DATABASE_SECTIONS.find((item) => item.id === 'clientAdd')!;

export function ClientAddPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState<ClientFormValues>(EMPTY_CLIENT_FORM_VALUES);
  const [errors, setErrors] = useState<ReturnType<typeof validateClientForm>['errors']>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    const { valid, errors: nextErrors } = validateClientForm(values);
    setErrors(nextErrors);
    if (!valid) {
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      await createClient(formValuesToCreateRequest(values));
      navigate(ROUTES.databaseClientSearch);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Не удалось создать клиента.');
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
        {section.title}
      </Typography>

      <Typography variant="h5" component="h1" gutterBottom>
        {section.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {section.description}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
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
    </Paper>
  );
}
