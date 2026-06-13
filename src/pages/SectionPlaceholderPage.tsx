import { Paper, Typography } from '@mui/material';

type SectionPlaceholderPageProps = {
  title: string;
};

export function SectionPlaceholderPage({ title }: SectionPlaceholderPageProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)',
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Раздел в разработке. Эндпоинты и содержимое будут подключены позже.
      </Typography>
    </Paper>
  );
}
