import CloseIcon from '@mui/icons-material/Close';
import { Box, Chip, Typography } from '@mui/material';
import type { ExternalRequestSearchFilters } from '../../../types/externalRequest';
import {
  lookupLabel,
  REQUEST_STATUS_LABELS,
  SOURCE_TYPE_LABELS,
} from '../../../types/client/enums';

type ChipItem = {
  id: string;
  label: string;
  onRemove: () => void;
};

type InteragencyFilterChipsProps = {
  filters: ExternalRequestSearchFilters;
  onRemoveStatus: (status: string) => void;
  onRemoveField: (key: Exclude<keyof ExternalRequestSearchFilters, 'statuses'>) => void;
  onResetAll: () => void;
};

export function InteragencyFilterChips({
  filters,
  onRemoveStatus,
  onRemoveField,
  onResetAll,
}: InteragencyFilterChipsProps) {
  const chips: ChipItem[] = [];

  if (filters.letterNumber.trim()) {
    chips.push({
      id: 'letterNumber',
      label: `Номер запроса: ${filters.letterNumber.trim()}`,
      onRemove: () => onRemoveField('letterNumber'),
    });
  }
  if (filters.letterDate.trim()) {
    chips.push({
      id: 'letterDate',
      label: `Дата запроса: ${filters.letterDate.trim()}`,
      onRemove: () => onRemoveField('letterDate'),
    });
  }
  if (filters.sourceType.trim()) {
    chips.push({
      id: 'sourceType',
      label: `Ведомство: ${lookupLabel(SOURCE_TYPE_LABELS, filters.sourceType)}`,
      onRemove: () => onRemoveField('sourceType'),
    });
  }
  filters.statuses.forEach((status) => {
    chips.push({
      id: `status-${status}`,
      label: `Статус: ${lookupLabel(REQUEST_STATUS_LABELS, status)}`,
      onRemove: () => onRemoveStatus(status),
    });
  });
  if (filters.initiatorLogin.trim()) {
    chips.push({
      id: 'initiatorLogin',
      label: `Инициатор: ${filters.initiatorLogin.trim()}`,
      onRemove: () => onRemoveField('initiatorLogin'),
    });
  }

  if (chips.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1 }}
    >
      <Typography variant="body2" color="text.secondary">
        Фильтр:
      </Typography>
      {chips.map((chip) => (
        <Chip
          key={chip.id}
          size="small"
          label={chip.label}
          onDelete={chip.onRemove}
          deleteIcon={<CloseIcon />}
          sx={{
            bgcolor: '#3d9a50',
            color: '#fff',
            '& .MuiChip-deleteIcon': { color: '#fff' },
          }}
        />
      ))}
      <Typography
        variant="body2"
        component="button"
        onClick={onResetAll}
        sx={{
          border: 'none',
          background: 'none',
          color: 'primary.main',
          cursor: 'pointer',
          p: 0,
          ml: 0.5,
        }}
      >
        Сбросить все
      </Typography>
    </Box>
  );
}
