import { Box, Paper, type PaperProps } from '@mui/material';

type ReportSectionCardProps = PaperProps & {
  children: React.ReactNode;
};

export function ReportSectionCard({
  children,
  sx,
  ...paperProps
}: ReportSectionCardProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)',
        ...sx,
      }}
      {...paperProps}
    >
      {children}
    </Paper>
  );
}

export function ReportSectionCardBody({ children }: { children: React.ReactNode }) {
  return <Box sx={{ mt: 2 }}>{children}</Box>;
}
