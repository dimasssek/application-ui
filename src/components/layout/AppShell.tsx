import { Box } from '@mui/material';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { layout } from '../../theme/theme';
import { SideNav } from './SideNav';

export function AppShell() {
  const [collapsed, setCollapsed] = useState(false);
  const mainOffset = collapsed
    ? layout.drawerCollapsedWidth
    : layout.drawerWidth;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <SideNav
        collapsed={collapsed}
        onToggleCollapsed={() => setCollapsed((value) => !value)}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: `calc(100% - ${mainOffset}px)`,
          minHeight: '100vh',
          p: 3,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
