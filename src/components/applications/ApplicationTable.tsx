import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {
  isQueued,
  type ColumnConfig,
} from '../../types/applications/registry';
import { lookupLabel } from '../../types/applications/enums';

type RowLike = { id: string; statusBusiness: string } & Record<
  string,
  unknown
>;

type ApplicationTableProps<TDto extends RowLike> = {
  items: TDto[];
  columns: ColumnConfig<keyof TDto & string>[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onEditRow: (item: TDto) => void;
};

function formatCellValue<TDto extends RowLike>(
  item: TDto,
  column: ColumnConfig<keyof TDto & string>
): string {
  const raw = item[column.key];
  if (raw == null || raw === '') {
    return '';
  }
  const value = String(raw);

  if (column.labels) {
    return lookupLabel(column.labels, value);
  }

  if (column.format === 'datetime') {
    return formatDateTime(value);
  }
  if (column.format === 'date') {
    return formatDate(value);
  }

  return value;
}

function formatDateTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleString('ru-RU');
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleDateString('ru-RU');
}

export function ApplicationTable<TDto extends RowLike>({
  items,
  columns,
  selectedId,
  onSelect,
  onEditRow,
}: ApplicationTableProps<TDto>) {
  const toggleSelection = (id: string) => {
    onSelect(selectedId === id ? null : id);
  };

  return (
    <TableContainer sx={{ maxWidth: '100%', overflowX: 'auto' }}>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" />
            {columns.map((column) => (
              <TableCell
                key={column.key}
                sx={{ minWidth: column.minWidth, fontWeight: 600 }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length + 1} align="center">
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ py: 3 }}
                >
                  Записи не найдены. Измените параметры поиска или добавьте
                  заявление.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => {
              const selected = selectedId === item.id;
              const queued = isQueued(item.statusBusiness);
              return (
                <TableRow
                  key={item.id}
                  hover
                  selected={selected}
                  onClick={() => toggleSelection(item.id)}
                  onDoubleClick={() => {
                    if (queued) {
                      onEditRow(item);
                    }
                  }}
                  sx={{
                    cursor: 'pointer',
                  }}
                  title={
                    queued
                      ? 'Двойной клик — открыть для редактирования'
                      : 'Редактирование доступно только для статуса «В очереди»'
                  }
                >
                  <TableCell
                    padding="checkbox"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <Checkbox
                      checked={selected}
                      onChange={() => toggleSelection(item.id)}
                      inputProps={{ 'aria-label': 'Выбрать заявление' }}
                    />
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell key={column.key}>
                      {formatCellValue(item, column)}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
