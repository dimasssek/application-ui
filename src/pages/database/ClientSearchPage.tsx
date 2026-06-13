import {
  Alert,
  Box,
  CircularProgress,
  Link,
  Paper,
  TablePagination,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  deleteClient,
  getClientEditPath,
  searchClients,
} from '../../api/databaseClientApi';
import { ClientFilterChips } from '../../components/database/clients/ClientFilterChips';
import { ClientSearchFilterPanel } from '../../components/database/clients/ClientSearchFilterPanel';
import { ClientSearchTable } from '../../components/database/clients/ClientSearchTable';
import { ClientSearchToolbar } from '../../components/database/clients/ClientSearchToolbar';
import {
  DATABASE_HUB_TITLE,
  DATABASE_SECTIONS,
} from '../../navigation/databaseSections';
import { ROUTES } from '../../navigation/routes';
import type { BankClient, ClientSearchFilters } from '../../types/client';
import { EMPTY_CLIENT_SEARCH_FILTERS } from '../../types/client';

const section = DATABASE_SECTIONS.find((item) => item.id === 'clientSearch')!;
const PAGE_SIZE_OPTIONS = [10, 25, 50];

export function ClientSearchPage() {
  const [filterOpen, setFilterOpen] = useState(true);
  const [draftFilters, setDraftFilters] = useState<ClientSearchFilters>(
    EMPTY_CLIENT_SEARCH_FILTERS
  );
  const [appliedFilters, setAppliedFilters] = useState<ClientSearchFilters>(
    EMPTY_CLIENT_SEARCH_FILTERS
  );
  const [clients, setClients] = useState<BankClient[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const loadClients = useCallback(async (filters: ClientSearchFilters) => {
    setLoading(true);
    setError(null);
    try {
      const result = await searchClients(filters);
      setClients(result.items);
      setTotal(result.total);
      setSelectedId(null);
      setPage(0);
    } catch {
      setError('Не удалось выполнить поиск клиентов.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadClients(EMPTY_CLIENT_SEARCH_FILTERS);
  }, [loadClients]);

  const paginatedClients = clients.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleApplyFilters = () => {
    setAppliedFilters(draftFilters);
    loadClients(draftFilters);
  };

  const handleResetFilters = () => {
    setDraftFilters(EMPTY_CLIENT_SEARCH_FILTERS);
    setAppliedFilters(EMPTY_CLIENT_SEARCH_FILTERS);
    loadClients(EMPTY_CLIENT_SEARCH_FILTERS);
  };

  const handleRemoveChip = (key: keyof ClientSearchFilters) => {
    const next = { ...appliedFilters, [key]: '' };
    setAppliedFilters(next);
    setDraftFilters(next);
    loadClients(next);
  };

  const handleDelete = async () => {
    if (!selectedId) {
      return;
    }
    setDeleting(true);
    setError(null);
    setSuccessMessage(null);
    try {
      await deleteClient(selectedId);
      setSuccessMessage('Запись успешно удалена.');
      await loadClients(appliedFilters);
    } catch {
      setError('Не удалось удалить запись.');
    } finally {
      setDeleting(false);
    }
  };

  const handleEdit = () => {
    if (!selectedId) {
      return;
    }
    // Эндпоинт /edit будет подключён позже.
    window.console.info(`Редактирование: ${getClientEditPath(selectedId)}`);
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
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {section.description}
      </Typography>

      <ClientSearchToolbar
        filterOpen={filterOpen}
        onToggleFilter={() => setFilterOpen((open) => !open)}
        selectedClientId={selectedId}
        onEdit={handleEdit}
        onDelete={handleDelete}
        deleteDisabled={deleting}
      />

      <ClientSearchFilterPanel
        open={filterOpen}
        values={draftFilters}
        onChange={setDraftFilters}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
      />

      <Box sx={{ mb: 2 }}>
        <ClientFilterChips
          filters={appliedFilters}
          onRemove={handleRemoveChip}
          onResetAll={handleResetFilters}
        />
      </Box>

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

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <ClientSearchTable
            clients={paginatedClients}
            selectedId={selectedId}
            onSelect={(clientId) => setSelectedId(clientId)}
          />
          <TablePagination
            component="div"
            count={total}
            page={page}
            onPageChange={(_, nextPage) => setPage(nextPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(Number(event.target.value));
              setPage(0);
            }}
            rowsPerPageOptions={PAGE_SIZE_OPTIONS}
            labelRowsPerPage="Выводить на страницу"
            labelDisplayedRows={({ from, to, count }) =>
              `Показано ${from} - ${to} из ${count} записей`
            }
          />
        </>
      )}
    </Paper>
  );
}
