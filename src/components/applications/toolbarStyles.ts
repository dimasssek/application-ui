export function actionButtonSx(enabled: boolean) {
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
