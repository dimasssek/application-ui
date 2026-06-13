import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { actionButtonSx } from './toolbarStyles';

type ApplicationToolbarProps = {
  title: string;
  filterOpen: boolean;
  onToggleFilter: () => void;
  selectedId: string | null;
  onAdd: () => void;
  onDelete: () => void;
  deleteDisabled?: boolean;
};

export function ApplicationToolbar({
  title,
  filterOpen,
  onToggleFilter,
  selectedId,
  onAdd,
  onDelete,
  deleteDisabled = false,
}: ApplicationToolbarProps) {
  const hasSelection = Boolean(selectedId);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 2,
        mb: 2,
      }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
        {title}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Tooltip title="Добавить заявление">
          <span>
            <IconButton
              onClick={onAdd}
              aria-label="Добавить заявление"
              sx={actionButtonSx(true)}
            >
              <AddIcon />
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip
          title={
            hasSelection ? 'Удалить заявление' : 'Выберите запись в таблице'
          }
        >
          <span>
            <IconButton
              onClick={onDelete}
              disabled={!hasSelection || deleteDisabled}
              aria-label="Удалить заявление"
              sx={actionButtonSx(hasSelection && !deleteDisabled)}
            >
              <CloseIcon />
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip title={filterOpen ? 'Скрыть фильтр' : 'Показать фильтр'}>
          <IconButton
            onClick={onToggleFilter}
            aria-label="Фильтр"
            sx={{
              width: 44,
              height: 36,
              borderRadius: 1,
              bgcolor: '#3d9a50',
              color: '#fff',
              '&:hover': { bgcolor: '#358a47' },
            }}
          >
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
