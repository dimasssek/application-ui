import { Box, Divider, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { MenuTile } from './MenuTile';

export type HubSection = {
  id: string;
  title: string;
  description: string;
  path: string;
};

type SectionHubPageProps = {
  title: string;
  sections: HubSection[];
};

export function SectionHubPage({ title, sections }: SectionHubPageProps) {
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
      <Divider sx={{ mb: 3 }} />

      <Box>
        <Grid container spacing={2}>
          {sections.map((section) => (
            <Grid key={section.id} size={{ xs: 12, md: 4 }}>
              <MenuTile
                title={section.title}
                description={section.description}
                path={section.path}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
}
