import CloseIcon from '@mui/icons-material/Close';
import { Box, Chip, Typography } from '@mui/material';
import { lookupLabel } from '../../types/applications/enums';
import type { FieldConfig } from '../../types/applications/registry';

type ApplicationFilterChipsProps<TFilters extends Record<string, string>> = {
  filters: TFilters;
  fields: FieldConfig<keyof TFilters & string>[];
  onRemove: (key: keyof TFilters & string) => void;
  onResetAll: () => void;
};

export function ApplicationFilterChips<
  TFilters extends Record<string, string>,
>({
  filters,
  fields,
  onRemove,
  onResetAll,
}: ApplicationFilterChipsProps<TFilters>) {
  const fieldsByKey = fields.reduce<Record<string, FieldConfig<string>>>(
    (acc, field) => {
      acc[field.key] = field;
      return acc;
    },
    {}
  );

  const activeEntries = (
    Object.entries(filters) as Array<[keyof TFilters & string, string]>
  ).filter(([, value]) => Boolean(value && value.trim().length > 0));

  if (activeEntries.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1 }}
    >
      <Typography variant="body2" color="text.secondary">
        Фильтр:
      </Typography>
      {activeEntries.map(([key, value]) => {
        const field = fieldsByKey[key];
        const label = field?.label ?? key;
        const displayValue = field?.labels
          ? lookupLabel(field.labels, value)
          : value;
        return (
          <Chip
            key={key}
            size="small"
            label={`${label}: ${displayValue}`}
            onDelete={() => onRemove(key)}
            deleteIcon={<CloseIcon />}
            sx={{
              bgcolor: '#3d9a50',
              color: '#fff',
              '& .MuiChip-deleteIcon': { color: '#fff' },
            }}
          />
        );
      })}
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
