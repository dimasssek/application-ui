import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';

type InteragencySearchToolbarProps = {
  filterOpen: boolean;
  onToggleFilter: () => void;
  selectedId: string | null;
  onOpen: () => void;
  onBatchCreate: () => void;
  onManualCreate: () => void;
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
      ? { bgcolor: '#d6e9f8', borderColor: 'primary.dark' }
      : { bgcolor: 'grey.100' },
    '&.Mui-disabled': {
      borderColor: 'grey.300',
      color: 'grey.400',
      bgcolor: 'grey.100',
    },
  };
}

export function InteragencySearchToolbar({
  filterOpen,
  onToggleFilter,
  selectedId,
  onOpen,
  onBatchCreate,
  onManualCreate,
}: InteragencySearchToolbarProps) {
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
        Межведомственные запросы
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<AddIcon />}
          onClick={onBatchCreate}
        >
          Пакетный запрос
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<AddIcon />}
          onClick={onManualCreate}
        >
          Ручной запрос
        </Button>

        <Tooltip
          title={hasSelection ? 'Открыть карточку' : 'Выберите запрос в таблице'}
        >
          <span>
            <IconButton
              onClick={onOpen}
              disabled={!hasSelection}
              aria-label="Открыть"
              sx={actionButtonSx(hasSelection)}
            >
              <VisibilityOutlinedIcon />
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
