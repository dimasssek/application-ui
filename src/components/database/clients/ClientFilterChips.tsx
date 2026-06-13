import CloseIcon from '@mui/icons-material/Close';
import { Box, Chip, Typography } from '@mui/material';
import type { ClientSearchFilters } from '../../../types/client';
import { CLIENT_FILTER_LABELS } from './clientTableColumns';

type ClientFilterChipsProps = {
  filters: ClientSearchFilters;
  onRemove: (key: keyof ClientSearchFilters) => void;
  onResetAll: () => void;
};

export function ClientFilterChips({
  filters,
  onRemove,
  onResetAll,
}: ClientFilterChipsProps) {
  const activeEntries = (
    Object.entries(filters) as Array<
      [keyof ClientSearchFilters, string]
    >
  ).filter(([, value]) => value.trim().length > 0);

  if (activeEntries.length === 0) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1 }}>
      <Typography variant="body2" color="text.secondary">
        Фильтр:
      </Typography>
      {activeEntries.map(([key, value]) => (
        <Chip
          key={key}
          size="small"
          label={`${CLIENT_FILTER_LABELS[key]}: ${value}`}
          onDelete={() => onRemove(key)}
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
