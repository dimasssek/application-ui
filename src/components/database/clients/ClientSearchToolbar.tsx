import CloseIcon from '@mui/icons-material/Close';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';

type ClientSearchToolbarProps = {
  filterOpen: boolean;
  onToggleFilter: () => void;
  selectedClientId: string | null;
  onEdit: () => void;
  onDelete: () => void;
  deleteDisabled?: boolean;
};

function actionButtonSx(enabled: boolean) {
  return {
    width: 44,
    height: 44,
    border: '2px solid',
    borderColor: enabled ? 'primary.main' : 'grey.300',
    color: enabled ? 'primary.main' : 'grey.400',
    bgcolor: enabled ? '#e8f2fb' : 'grey.100',
    boxShadow: enabled ? '0 1px 4px rgba(30, 107, 184, 0.2)' : 'none',
    '&:hover': enabled
      ? {
          bgcolor: '#d6e9f8',
          borderColor: 'primary.dark',
        }
      : {
          bgcolor: 'grey.100',
      },
    '&.Mui-disabled': {
      borderColor: 'grey.300',
      color: 'grey.400',
      bgcolor: 'grey.100',
    },
  };
}

export function ClientSearchToolbar({
  filterOpen,
  onToggleFilter,
  selectedClientId,
  onEdit,
  onDelete,
  deleteDisabled = false,
}: ClientSearchToolbarProps) {
  const hasSelection = Boolean(selectedClientId);

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
        Список клиентов
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Tooltip
          title={
            hasSelection
              ? 'Редактировать (будет доступно позже)'
              : 'Выберите запись в таблице'
          }
        >
          <span>
            <IconButton
              onClick={onEdit}
              disabled={!hasSelection}
              aria-label="Редактировать"
              sx={actionButtonSx(hasSelection)}
            >
              <EditOutlinedIcon />
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip
          title={
            hasSelection ? 'Удалить запись' : 'Выберите запись в таблице'
          }
        >
          <span>
            <IconButton
              onClick={onDelete}
              disabled={!hasSelection || deleteDisabled}
              aria-label="Удалить"
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
