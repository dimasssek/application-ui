import StorageIcon from '@mui/icons-material/Storage';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BarChartIcon from '@mui/icons-material/BarChart';
import type { SvgIconComponent } from '@mui/icons-material';
import { ROUTES, type AppRoutePath } from './routes';

export type NavItemId = 'home' | 'database' | 'applications' | 'reports';

export type NavItem = {
  id: NavItemId;
  label: string;
  path: AppRoutePath;
  icon: SvgIconComponent;
};

export const APP_TITLE = 'BSPS';
export const APP_FULL_NAME = 'Система обработки банковских заявлений';

export const SIDE_NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Главное меню', path: ROUTES.home, icon: HomeIcon },
  {
    id: 'database',
    label: 'Ведение базы данных',
    path: ROUTES.database,
    icon: StorageIcon,
  },
  {
    id: 'applications',
    label: 'Обработка заявлений',
    path: ROUTES.applications,
    icon: AssignmentIcon,
  },
  {
    id: 'reports',
    label: 'Отчёты и статистика',
    path: ROUTES.reports,
    icon: BarChartIcon,
  },
];

export type MainMenuSection = {
  id: Exclude<NavItemId, 'home'>;
  title: string;
  description: string;
  path: AppRoutePath;
};

export const MAIN_MENU_SECTIONS: MainMenuSection[] = [
  {
    id: 'database',
    title: 'Ведение базы данных',
    description: 'Ведение базы данных',
    path: ROUTES.database,
  },
  {
    id: 'applications',
    title: 'Обработка заявлений',
    description: 'Обработка банковских заявлений',
    path: ROUTES.applications,
  },
  {
    id: 'reports',
    title: 'Отчёты и статистика',
    description: 'Отчёты и статистика',
    path: ROUTES.reports,
  },
];
