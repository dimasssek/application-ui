import { Box, Typography } from '@mui/material';

type RequiredFieldLabelProps = {
  children: React.ReactNode;
};

export function RequiredFieldLabel({ children }: RequiredFieldLabelProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.75 }}>
      <Typography component="span" sx={{ color: '#c23934', lineHeight: 1 }}>
        *
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {children}
      </Typography>
    </Box>
  );
}
