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
import type { BankClient } from '../../../types/client';
import { CLIENT_TABLE_COLUMNS } from './clientTableColumns';

function formatActualDate(value: string) {
  if (!value) {
    return '';
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleString('ru-RU');
}

type ClientSearchTableProps = {
  clients: BankClient[];
  selectedId: string | null;
  onSelect: (clientId: string | null) => void;
};

export function ClientSearchTable({
  clients,
  selectedId,
  onSelect,
}: ClientSearchTableProps) {
  const getCellValue = (client: BankClient, key: keyof BankClient) => {
    if (key === 'actualDate') {
      return formatActualDate(client.actualDate);
    }
    return client[key];
  };

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
                      {getCellValue(client, column.key)}
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
