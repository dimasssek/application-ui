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
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  getExternalRequestDetailPath,
  searchExternalRequests,
} from '../../api/externalRequestApi';
import { InteragencyBatchCreateDialog } from '../../components/database/interagency/InteragencyBatchCreateDialog';
import { InteragencyFilterChips } from '../../components/database/interagency/InteragencyFilterChips';
import { InteragencySearchFilterPanel } from '../../components/database/interagency/InteragencySearchFilterPanel';
import { InteragencySearchTable } from '../../components/database/interagency/InteragencySearchTable';
import { InteragencySearchToolbar } from '../../components/database/interagency/InteragencySearchToolbar';
import {
  DATABASE_HUB_TITLE,
  DATABASE_SECTIONS,
} from '../../navigation/databaseSections';
import { ROUTES } from '../../navigation/routes';
import {
  DEFAULT_EXTERNAL_REQUEST_SORT_KEY,
  EMPTY_EXTERNAL_REQUEST_SEARCH_FILTERS,
  toExternalRequestQueryParams,
  type ExternalRequestListTo,
  type ExternalRequestSearchFilters,
} from '../../types/externalRequest';

const section = DATABASE_SECTIONS.find((item) => item.id === 'interagency')!;
const PAGE_SIZE_OPTIONS = [10, 25, 50];

export function InteragencySearchPage() {
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(true);
  const [draftFilters, setDraftFilters] = useState<ExternalRequestSearchFilters>(
    EMPTY_EXTERNAL_REQUEST_SEARCH_FILTERS
  );
  const [appliedFilters, setAppliedFilters] =
    useState<ExternalRequestSearchFilters>(EMPTY_EXTERNAL_REQUEST_SEARCH_FILTERS);
  const [items, setItems] = useState<ExternalRequestListTo[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [batchDialogOpen, setBatchDialogOpen] = useState(false);

  const loadItems = useCallback(
    async (
      filters: ExternalRequestSearchFilters,
      pageNo: number,
      pageSize: number
    ) => {
      setLoading(true);
      setError(null);
      try {
        const result = await searchExternalRequests(
          toExternalRequestQueryParams(filters, {
            pageNo,
            pageSize,
            sortKey: DEFAULT_EXTERNAL_REQUEST_SORT_KEY,
          })
        );
        setItems(result.content);
        setTotal(result.metaData.totalElements);
        setSelectedId(null);
        setPage(result.metaData.number);
      } catch {
        setError('Не удалось загрузить список запросов.');
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    loadItems(EMPTY_EXTERNAL_REQUEST_SEARCH_FILTERS, 0, rowsPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- начальная загрузка
  }, [loadItems]);

  const reloadCurrent = useCallback(
    (filters: ExternalRequestSearchFilters, pageNo: number, pageSize: number) =>
      loadItems(filters, pageNo, pageSize),
    [loadItems]
  );

  const openDetail = (id: string) => {
    navigate(getExternalRequestDetailPath(id));
  };

  const applyFiltersWithRemoval = (next: ExternalRequestSearchFilters) => {
    setAppliedFilters(next);
    setDraftFilters(next);
    reloadCurrent(next, 0, rowsPerPage);
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

      <InteragencySearchToolbar
        filterOpen={filterOpen}
        onToggleFilter={() => setFilterOpen((open) => !open)}
        selectedId={selectedId}
        onOpen={() => selectedId && openDetail(selectedId)}
        onBatchCreate={() => setBatchDialogOpen(true)}
        onManualCreate={() => navigate(ROUTES.databaseInteragencyManualCreate)}
      />

      <InteragencySearchFilterPanel
        open={filterOpen}
        values={draftFilters}
        onChange={setDraftFilters}
        onApply={() => {
          setAppliedFilters(draftFilters);
          reloadCurrent(draftFilters, 0, rowsPerPage);
        }}
        onReset={() => {
          setDraftFilters(EMPTY_EXTERNAL_REQUEST_SEARCH_FILTERS);
          setAppliedFilters(EMPTY_EXTERNAL_REQUEST_SEARCH_FILTERS);
          reloadCurrent(EMPTY_EXTERNAL_REQUEST_SEARCH_FILTERS, 0, rowsPerPage);
        }}
      />

      <Box sx={{ mb: 2 }}>
        <InteragencyFilterChips
          filters={appliedFilters}
          onRemoveStatus={(status) =>
            applyFiltersWithRemoval({
              ...appliedFilters,
              statuses: appliedFilters.statuses.filter((item) => item !== status),
            })
          }
          onRemoveField={(key) =>
            applyFiltersWithRemoval({
              ...appliedFilters,
              [key]: '',
            })
          }
          onResetAll={() => {
            setDraftFilters(EMPTY_EXTERNAL_REQUEST_SEARCH_FILTERS);
            setAppliedFilters(EMPTY_EXTERNAL_REQUEST_SEARCH_FILTERS);
            reloadCurrent(EMPTY_EXTERNAL_REQUEST_SEARCH_FILTERS, 0, rowsPerPage);
          }}
        />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <InteragencySearchTable
            items={items}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onOpenRow={(item) => openDetail(item.id)}
          />
          <TablePagination
            component="div"
            count={total}
            page={page}
            onPageChange={(_, nextPage) =>
              reloadCurrent(appliedFilters, nextPage, rowsPerPage)
            }
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

      <InteragencyBatchCreateDialog
        open={batchDialogOpen}
        onClose={() => setBatchDialogOpen(false)}
        onCreated={(requestId) => openDetail(requestId)}
      />
    </Paper>
  );
}
