import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useCallback, useEffect, useState } from 'react';
import { searchClients } from '../../../api/databaseClientApi';
import { createExternalRequestBatch } from '../../../api/externalRequestApi';
import { INITIATOR_LOGIN } from '../../../config/initiatorLogin';
import type { ClientTo } from '../../../types/client';
import { DEFAULT_CLIENT_SORT_KEY } from '../../../types/client';
import { CLIENT_STATUS, SOURCE_TYPE_OPTIONS, type SourceType } from '../../../types/client/enums';
import {
  EMPTY_INTERAGENCY_LETTER_FORM,
  validateInteragencyLetterForm,
  type InteragencyLetterFormValues,
} from './interagencyFormState';

type InteragencyBatchCreateDialogProps = {
  open: boolean;
  onClose: () => void;
  onCreated: (requestId: string) => void;
};

export function InteragencyBatchCreateDialog({
  open,
  onClose,
  onCreated,
}: InteragencyBatchCreateDialogProps) {
  const [letter, setLetter] = useState<InteragencyLetterFormValues>(
    EMPTY_INTERAGENCY_LETTER_FORM
  );
  const [letterErrors, setLetterErrors] = useState<
    Partial<Record<keyof InteragencyLetterFormValues, string>>
  >({});
  const [clientQuery, setClientQuery] = useState('');
  const [clients, setClients] = useState<ClientTo[]>([]);
  const [selectedClientIds, setSelectedClientIds] = useState<string[]>([]);
  const [loadingClients, setLoadingClients] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }
    setLetter(EMPTY_INTERAGENCY_LETTER_FORM);
    setLetterErrors({});
    setClientQuery('');
    setClients([]);
    setSelectedClientIds([]);
    setError(null);
  }, [open]);

  const loadClients = useCallback(async (lastName: string) => {
    setLoadingClients(true);
    try {
      const result = await searchClients({
        lastName: lastName.trim() || undefined,
        statuses: [CLIENT_STATUS.ACTUAL],
        pageNo: 0,
        pageSize: 20,
        sortKey: DEFAULT_CLIENT_SORT_KEY,
      });
      setClients(result.content);
    } catch {
      setClients([]);
    } finally {
      setLoadingClients(false);
    }
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }
    const timer = window.setTimeout(() => {
      loadClients(clientQuery);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [open, clientQuery, loadClients]);

  const toggleClient = (clientId: string) => {
    setSelectedClientIds((current) =>
      current.includes(clientId)
        ? current.filter((id) => id !== clientId)
        : [...current, clientId]
    );
  };

  const handleSubmit = async () => {
    const { valid, errors } = validateInteragencyLetterForm(letter);
    setLetterErrors(errors);
    if (!valid) {
      return;
    }
    if (selectedClientIds.length === 0) {
      setError('Выберите хотя бы одного клиента.');
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const created = await createExternalRequestBatch({
        letterNumber: letter.letterNumber.trim(),
        letterDate: letter.letterDate.trim(),
        sourceType: letter.sourceType as SourceType,
        initiatorLogin: INITIATOR_LOGIN,
        clientIds: selectedClientIds,
      });
      onCreated(created.id);
      onClose();
    } catch {
      setError('Не удалось создать пакетный запрос.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Новый пакетный запрос</DialogTitle>
      <DialogContent dividers>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Укажите параметры запроса и выберите клиентов из базы банка.
        </Typography>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              size="small"
              label="Номер запроса *"
              value={letter.letterNumber}
              onChange={(event) =>
                setLetter((current) => ({
                  ...current,
                  letterNumber: event.target.value,
                }))
              }
              error={Boolean(letterErrors.letterNumber)}
              helperText={letterErrors.letterNumber}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              size="small"
              type="date"
              label="Дата запроса *"
              value={letter.letterDate}
              onChange={(event) =>
                setLetter((current) => ({
                  ...current,
                  letterDate: event.target.value,
                }))
              }
              InputLabelProps={{ shrink: true }}
              error={Boolean(letterErrors.letterDate)}
              helperText={letterErrors.letterDate}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              select
              fullWidth
              size="small"
              label="Ведомство *"
              value={letter.sourceType}
              onChange={(event) =>
                setLetter((current) => ({
                  ...current,
                  sourceType: event.target.value,
                }))
              }
              InputLabelProps={{ shrink: true }}
              SelectProps={{ displayEmpty: true }}
              error={Boolean(letterErrors.sourceType)}
              helperText={letterErrors.sourceType}
            >
              <MenuItem value="">
                <em>Не выбрано</em>
              </MenuItem>
              {SOURCE_TYPE_OPTIONS.map((option) => (
                <MenuItem key={option.code} value={option.code}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        <TextField
          fullWidth
          size="small"
          label="Поиск клиентов по фамилии"
          value={clientQuery}
          onChange={(event) => setClientQuery(event.target.value)}
          sx={{ mb: 2 }}
        />

        {loadingClients ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
            <CircularProgress size={28} />
          </Box>
        ) : (
          <TableContainer sx={{ maxHeight: 280 }}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox" />
                  <TableCell>Фамилия</TableCell>
                  <TableCell>Имя</TableCell>
                  <TableCell>Дата рождения</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                        Клиенты не найдены
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  clients.map((client) => {
                    const checked = selectedClientIds.includes(client.id);
                    return (
                      <TableRow
                        key={client.id}
                        hover
                        selected={checked}
                        onClick={() => toggleClient(client.id)}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={checked} />
                        </TableCell>
                        <TableCell>{client.lastName}</TableCell>
                        <TableCell>{client.firstName}</TableCell>
                        <TableCell>{client.birthDate}</TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Выбрано клиентов: {selectedClientIds.length}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={submitting}>
          Отмена
        </Button>
        <Button variant="contained" onClick={handleSubmit} disabled={submitting}>
          Создать
        </Button>
      </DialogActions>
    </Dialog>
  );
}
