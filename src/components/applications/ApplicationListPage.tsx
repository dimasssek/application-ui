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
import { APPLICATIONS_HUB_TITLE } from '../../navigation/applicationSections';
import { ROUTES } from '../../navigation/routes';
import { DEFAULT_APPLICATION_SORT_KEY } from '../../types/applications/common';
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

type ApplicationListPageProps<
  TDto extends { id: string; statusBusiness: string },
  TFilters extends Record<string, string>,
  TQueryParams,
  TCreate = Record<string, unknown>,
  TUpdate = Record<string, unknown>,
> = {
  config: ApplicationConfig<TDto, TFilters, TQueryParams, TCreate, TUpdate>;
};

export function ApplicationListPage<
  TDto extends { id: string; statusBusiness: string } & Record<
    string,
    unknown
  >,
  TFilters extends Record<string, string>,
  TQueryParams,
  TCreate = Record<string, unknown>,
  TUpdate = Record<string, unknown>,
>({ config }: ApplicationListPageProps<TDto, TFilters, TQueryParams, TCreate, TUpdate>) {
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
  const [dialogInitialValues, setDialogInitialValues] = useState<
    Record<string, unknown>
  >({});
  const [editingId, setEditingId] = useState<string | null>(null);

  const loadItems = useCallback(
    async (filters: TFilters, pageNo: number, pageSize: number) => {
      setLoading(true);
      setError(null);
      try {
        const result = await config.api.search(
          config.toQueryParams(filters, {
            pageNo,
            pageSize,
            sortKey: DEFAULT_APPLICATION_SORT_KEY,
          })
        );
        setItems(result.content);
        setTotal(result.metaData.totalElements);
        setSelectedId(null);
        setPage(result.metaData.number);
      } catch {
        setError('Не удалось загрузить список заявлений.');
      } finally {
        setLoading(false);
      }
    },
    [config]
  );

  useEffect(() => {
    loadItems(config.emptyFilters, 0, rowsPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- начальная загрузка
  }, [loadItems]);

  const reloadCurrent = useCallback(
    (filters: TFilters, pageNo: number, pageSize: number) => {
      return loadItems(filters, pageNo, pageSize);
    },
    [loadItems]
  );

  const handleApplyFilters = () => {
    setAppliedFilters(draftFilters);
    reloadCurrent(draftFilters, 0, rowsPerPage);
  };

  const handleResetFilters = () => {
    setDraftFilters(config.emptyFilters);
    setAppliedFilters(config.emptyFilters);
    reloadCurrent(config.emptyFilters, 0, rowsPerPage);
  };

  const handleRemoveChip = (key: keyof TFilters & string) => {
    const next = { ...appliedFilters, [key]: '' };
    setAppliedFilters(next);
    setDraftFilters(next);
    reloadCurrent(next, 0, rowsPerPage);
  };

  const handleAdd = () => {
    setDialogMode('create');
    setEditingId(null);
    setDialogInitialValues(config.buildDefaults());
    setDialogOpen(true);
  };

  const handleEditRow = (item: TDto) => {
    if (!isQueued(item.statusBusiness)) {
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
      await reloadCurrent(appliedFilters, page, rowsPerPage);
    } catch {
      setError('Не удалось удалить заявление.');
    } finally {
      setMutating(false);
    }
  };

  const handleSubmitDialog = async (payload: Record<string, unknown>) => {
    setMutating(true);
    setError(null);
    setSuccessMessage(null);
    try {
      if (dialogMode === 'create') {
        const created = await config.api.create(payload as TCreate);
        setSuccessMessage(`Заявление ${created.number ?? ''} создано.`.trim());
        setDialogOpen(false);
        await reloadCurrent(appliedFilters, 0, rowsPerPage);
      } else if (editingId) {
        await config.api.update(editingId, payload as TUpdate);
        setSuccessMessage('Изменения сохранены.');
        setDialogOpen(false);
        await reloadCurrent(appliedFilters, page, rowsPerPage);
      }
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
            items={items}
            columns={config.columns}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onEditRow={handleEditRow}
          />
          <TablePagination
            component="div"
            count={total}
            page={page}
            onPageChange={(_, nextPage) => {
              reloadCurrent(appliedFilters, nextPage, rowsPerPage);
            }}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(event) => {
              const nextSize = Number(event.target.value);
              setRowsPerPage(nextSize);
              reloadCurrent(appliedFilters, 0, nextSize);
            }}
            rowsPerPageOptions={PAGE_SIZE_OPTIONS}
            labelRowsPerPage="Выводить на страницу"
            labelDisplayedRows={({ from, to, count }) =>
              `Показано ${from} - ${to} из ${count} записей`
            }
          />
        </>
      )}

      <ApplicationFormDialog
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
