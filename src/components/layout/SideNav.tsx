import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import {
  APP_FULL_NAME,
  APP_TITLE,
  SIDE_NAV_ITEMS,
  type NavItem,
} from '../../navigation/navItems';
import { layout } from '../../theme/theme';

type SideNavProps = {
  collapsed: boolean;
  onToggleCollapsed: () => void;
};

function navLinkStyle(isActive: boolean, collapsed: boolean) {
  return {
    mx: 1,
    mb: 0.5,
    borderRadius: 1,
    borderRight: isActive ? '3px solid' : '3px solid transparent',
    borderRightColor: isActive ? 'primary.main' : 'transparent',
    bgcolor: isActive ? 'primary.light' : 'transparent',
    '&:hover': {
      bgcolor: isActive ? 'primary.light' : 'action.hover',
    },
    '& .MuiListItemIcon-root': {
      color: 'primary.main',
      minWidth: collapsed ? 0 : 40,
      justifyContent: 'center',
    },
    '& .MuiListItemText-primary': {
      fontSize: '0.875rem',
      fontWeight: isActive ? 600 : 400,
      color: 'primary.main',
    },
  };
}

function isNavItemActive(path: string, pathname: string) {
  if (path === '/') {
    return pathname === '/';
  }
  return pathname === path || pathname.startsWith(`${path}/`);
}

function NavListItem({
  item,
  collapsed,
}: {
  item: NavItem;
  collapsed: boolean;
}) {
  const Icon = item.icon;
  const { pathname } = useLocation();
  const isActive = isNavItemActive(item.path, pathname);

  return (
    <ListItemButton
      component={Link}
      to={item.path}
      sx={navLinkStyle(isActive, collapsed)}
    >
      <ListItemIcon>
        <Icon fontSize="small" />
      </ListItemIcon>
      {!collapsed && <ListItemText primary={item.label} />}
    </ListItemButton>
  );
}

export function SideNav({ collapsed, onToggleCollapsed }: SideNavProps) {
  const width = collapsed ? layout.drawerCollapsedWidth : layout.drawerWidth;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width,
          boxSizing: 'border-box',
          bgcolor: 'background.paper',
          overflowX: 'hidden',
        },
      }}
    >
      <Toolbar
        sx={{
          minHeight: 48,
          px: 1,
          bgcolor: 'primary.light',
          justifyContent: collapsed ? 'center' : 'flex-start',
        }}
      >
        <IconButton
          size="small"
          onClick={onToggleCollapsed}
          aria-label={collapsed ? 'Развернуть меню' : 'Свернуть меню'}
          sx={{ color: 'primary.main' }}
        >
          {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
        {!collapsed && (
          <IconButton
            size="small"
            sx={{ color: 'primary.main', ml: 0.5 }}
            aria-label="Меню"
          >
            <MenuIcon fontSize="small" />
          </IconButton>
        )}
      </Toolbar>

      {!collapsed && (
        <Box sx={{ px: 2, py: 2, bgcolor: 'primary.light' }}>
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              fontWeight: 700,
              letterSpacing: '0.04em',
              color: 'primary.main',
              mb: 0.5,
            }}
          >
            {APP_TITLE}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              lineHeight: 1.4,
              color: 'primary.dark',
              textTransform: 'uppercase',
              fontSize: '0.65rem',
            }}
          >
            {APP_FULL_NAME}
          </Typography>
        </Box>
      )}

      <Divider />

      <List sx={{ flexGrow: 1, py: 1 }}>
        {SIDE_NAV_ITEMS.map((item) => (
          <NavListItem key={item.id} item={item} collapsed={collapsed} />
        ))}
      </List>
    </Drawer>
  );
}
