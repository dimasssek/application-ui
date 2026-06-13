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
import type { ExternalRequestListTo } from '../../../types/externalRequest';
import {
  formatInteragencyCell,
  INTERAGENCY_TABLE_COLUMNS,
} from './interagencyTableColumns';

type InteragencySearchTableProps = {
  items: ExternalRequestListTo[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onOpenRow: (item: ExternalRequestListTo) => void;
};

export function InteragencySearchTable({
  items,
  selectedId,
  onSelect,
  onOpenRow,
}: InteragencySearchTableProps) {
  const toggleSelection = (id: string) => {
    onSelect(selectedId === id ? null : id);
  };

  return (
    <TableContainer sx={{ maxWidth: '100%', overflowX: 'auto' }}>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" />
            {INTERAGENCY_TABLE_COLUMNS.map((column) => (
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
              <TableCell
                colSpan={INTERAGENCY_TABLE_COLUMNS.length + 1}
                align="center"
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ py: 3 }}
                >
                  Записи не найдены. Измените параметры поиска или создайте
                  запрос.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => {
              const selected = selectedId === item.id;
              return (
                <TableRow
                  key={item.id}
                  hover
                  selected={selected}
                  onClick={() => toggleSelection(item.id)}
                  onDoubleClick={() => onOpenRow(item)}
                  sx={{ cursor: 'pointer' }}
                  title="Двойной клик — открыть карточку запроса"
                >
                  <TableCell
                    padding="checkbox"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <Checkbox
                      checked={selected}
                      onChange={() => toggleSelection(item.id)}
                      inputProps={{ 'aria-label': 'Выбрать запрос' }}
                    />
                  </TableCell>
                  {INTERAGENCY_TABLE_COLUMNS.map((column) => (
                    <TableCell key={column.key}>
                      {formatInteragencyCell(item, column)}
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
