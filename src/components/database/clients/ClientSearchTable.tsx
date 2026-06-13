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
import { lookupLabel } from '../../../types/client/enums';
import type { ClientTo } from '../../../types/client';
import { CLIENT_TABLE_COLUMNS, type ClientTableColumn } from './clientTableColumns';

function formatDateTime(value: string | null) {
  if (!value) {
    return '';
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleString('ru-RU');
}

function formatCellValue(client: ClientTo, column: ClientTableColumn): string {
  const key = column.key;

  if (key === 'actualDate') {
    return formatDateTime(client.actualDate);
  }
  if (key === 'addressDefined') {
    return client.addressDefined ? 'Да' : 'Нет';
  }
  if (key === 'status') {
    return lookupLabel(column.labels ?? {}, client.status);
  }

  const raw = client[key as keyof ClientTo];
  if (raw == null || raw === '') {
    return '';
  }
  const value = String(raw);

  if (column.labels) {
    return lookupLabel(column.labels, value);
  }
  return value;
}

type ClientSearchTableProps = {
  clients: ClientTo[];
  selectedId: string | null;
  onSelect: (clientId: string | null) => void;
};

export function ClientSearchTable({
  clients,
  selectedId,
  onSelect,
}: ClientSearchTableProps) {
  const toggleSelection = (clientId: string) => {
    onSelect(selectedId === clientId ? null : clientId);
  };

  return (
    <TableContainer sx={{ maxWidth: '100%', overflowX: 'auto' }}>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" />
            {CLIENT_TABLE_COLUMNS.map((column) => (
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
          {clients.length === 0 ? (
            <TableRow>
              <TableCell colSpan={CLIENT_TABLE_COLUMNS.length + 1} align="center">
                <Typography variant="body2" color="text.secondary" sx={{ py: 3 }}>
                  Записи не найдены. Измените параметры поиска и нажмите «Применить».
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            clients.map((client) => {
              const isSelected = selectedId === client.id;
              return (
                <TableRow
                  key={client.id}
                  hover
                  selected={isSelected}
                  onClick={() => toggleSelection(client.id)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={isSelected}
                      onChange={() => toggleSelection(client.id)}
                      inputProps={{ 'aria-label': `Выбрать ${client.lastName}` }}
                    />
                  </TableCell>
                  {CLIENT_TABLE_COLUMNS.map((column) => (
                    <TableCell key={column.key}>
                      {formatCellValue(client, column)}
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
