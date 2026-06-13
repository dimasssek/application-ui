import {
  Box,
  Card,
  CardActionArea,
  Divider,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

type MenuTileProps = {
  title: string;
  description: string;
  path: string;
};

export function MenuTile({ title, description, path }: MenuTileProps) {
  const navigate = useNavigate();

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)',
        transition: 'box-shadow 0.2s, border-color 0.2s',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          borderColor: 'primary.main',
        },
      }}
    >
      <CardActionArea
        onClick={() => navigate(path)}
        sx={{
          height: '100%',
          display: 'block',
          textAlign: 'left',
          p: 2.5,
        }}
      >
        <Box>
          <Typography
            variant="h6"
            component="h2"
            sx={{ fontWeight: 600, color: 'text.primary', mb: 1.5 }}
          >
            {title}
          </Typography>
          <Divider sx={{ mb: 1.5 }} />
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
}
