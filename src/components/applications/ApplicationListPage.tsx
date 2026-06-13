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
  APPLICATIONS_HUB_TITLE,
} from '../../navigation/applicationSections';
import { ROUTES } from '../../navigation/routes';
import { STATUS_BUSINESS } from '../../types/applications/enums';
import {
  isQueued,
  type ApplicationConfig,
} from '../../types/applications/registry';
import { ApplicationFilterChips } from './ApplicationFilterChips';
import { ApplicationFilterPanel } from './ApplicationFilterPanel';
import { ApplicationFormDialog } from './ApplicationFormDialog';
import type { ApplicationFormMode } from './ApplicationFormDialog';
import { ApplicationTable } from './ApplicationTable';
import { ApplicationToolbar } from './ApplicationToolbar';

const PAGE_SIZE_OPTIONS = [10, 25, 50];

function stripId<TDto extends { id: string }>(
  values: TDto
): Omit<TDto, 'id'> {
  const copy = { ...values } as Partial<TDto>;
  delete copy.id;
  return copy as Omit<TDto, 'id'>;
}

type ApplicationListPageProps<
  TDto extends { id: string; status_business: string },
  TFilters extends Record<string, string>,
> = {
  config: ApplicationConfig<TDto, TFilters>;
};

export function ApplicationListPage<
  TDto extends { id: string; status_business: string } & Record<
    string,
    unknown
  >,
  TFilters extends Record<string, string>,
>({ config }: ApplicationListPageProps<TDto, TFilters>) {
  const [filterOpen, setFilterOpen] = useState(true);
  const [draftFilters, setDraftFilters] = useState<TFilters>(
    config.emptyFilters
  );
  const [appliedFilters, setAppliedFilters] = useState<TFilters>(
    config.emptyFilters
  );
  const [items, setItems] = useState<TDto[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [mutating, setMutating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<ApplicationFormMode>('create');
  const [dialogInitialValues, setDialogInitialValues] = useState<Partial<TDto>>(
    {}
  );
  const [editingId, setEditingId] = useState<string | null>(null);

  const loadItems = useCallback(
    async (filters: TFilters) => {
      setLoading(true);
      setError(null);
      try {
        const result = await config.api.search(filters);
        setItems(result.items);
        setTotal(result.total);
        setSelectedId(null);
        setPage(0);
      } catch {
        setError('Не удалось загрузить список заявлений.');
      } finally {
        setLoading(false);
      }
    },
    [config.api]
  );

  useEffect(() => {
    loadItems(config.emptyFilters);
  }, [loadItems, config.emptyFilters]);

  const paginated = items.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleApplyFilters = () => {
    setAppliedFilters(draftFilters);
    loadItems(draftFilters);
  };

  const handleResetFilters = () => {
    setDraftFilters(config.emptyFilters);
    setAppliedFilters(config.emptyFilters);
    loadItems(config.emptyFilters);
  };

  const handleRemoveChip = (key: keyof TFilters & string) => {
    const next = { ...appliedFilters, [key]: '' };
    setAppliedFilters(next);
    setDraftFilters(next);
    loadItems(next);
  };

  const handleAdd = () => {
    setDialogMode('create');
    setEditingId(null);
    setDialogInitialValues(config.buildDefaults());
    setDialogOpen(true);
  };

  const handleEditRow = (item: TDto) => {
    if (!isQueued(item.status_business)) {
      return;
    }
    setDialogMode('edit');
    setEditingId(item.id);
    setDialogInitialValues(item);
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedId) {
      return;
    }
    setMutating(true);
    setError(null);
    setSuccessMessage(null);
    try {
      await config.api.delete(selectedId);
      setSuccessMessage('Заявление удалено.');
      await loadItems(appliedFilters);
    } catch {
      setError('Не удалось удалить заявление.');
    } finally {
      setMutating(false);
    }
  };

  const handleSubmitDialog = async (values: TDto) => {
    setMutating(true);
    setError(null);
    setSuccessMessage(null);
    try {
      if (dialogMode === 'create') {
        const payload = stripId(values);
        const created = await config.api.create(payload);
        setSuccessMessage(`Заявление ${created.number ?? ''} создано.`.trim());
      } else if (editingId) {
        const payload: Partial<TDto> = {
          ...values,
          status_business: STATUS_BUSINESS.QUEUED,
        };
        await config.api.update(editingId, payload);
        setSuccessMessage('Изменения сохранены.');
      }
      setDialogOpen(false);
      await loadItems(appliedFilters);
    } catch {
      setError(
        dialogMode === 'create'
          ? 'Не удалось создать заявление.'
          : 'Не удалось сохранить изменения.'
      );
    } finally {
      setMutating(false);
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
        {config.title}
      </Typography>

      <Typography variant="h5" component="h1" gutterBottom>
        {config.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {config.description}
      </Typography>

      <ApplicationToolbar
        title="Список заявлений"
        filterOpen={filterOpen}
        onToggleFilter={() => setFilterOpen((open) => !open)}
        selectedId={selectedId}
        onAdd={handleAdd}
        onDelete={handleDelete}
        deleteDisabled={mutating}
      />

      <ApplicationFilterPanel
        open={filterOpen}
        values={draftFilters}
        fields={config.filterFields}
        onChange={setDraftFilters}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
      />

      <Box sx={{ mb: 2 }}>
        <ApplicationFilterChips
          filters={appliedFilters}
          fields={config.filterFields}
          onRemove={handleRemoveChip}
          onResetAll={handleResetFilters}
        />
      </Box>

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
          onClose={() => setError(null)}
        >
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
          <ApplicationTable
            items={paginated}
            columns={config.columns}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onEditRow={handleEditRow}
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

      <ApplicationFormDialog<TDto>
        open={dialogOpen}
        mode={dialogMode}
        title={config.title}
        fields={config.formFields}
        initialValues={dialogInitialValues}
        submitting={mutating}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmitDialog}
      />
    </Paper>
  );
}
