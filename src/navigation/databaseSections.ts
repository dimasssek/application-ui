import { ROUTES } from './routes';

export type DatabaseSectionId =
  | 'clientSearch'
  | 'clientAdd'
  | 'interagency';

export type DatabaseSection = {
  id: DatabaseSectionId;
  title: string;
  description: string;
  path: string;
};

export const DATABASE_HUB_TITLE = 'Ведение базы данных';

export const DATABASE_SECTIONS: DatabaseSection[] = [
  {
    id: 'clientSearch',
    title: 'Поиск по клиентам',
    description: 'Поиск клиентов банка',
    path: ROUTES.databaseClientSearch,
  },
  {
    id: 'clientAdd',
    title: 'Добавление клиента',
    description: 'Добавление клиента банка',
    path: ROUTES.databaseClientAdd,
  },
  {
    id: 'interagency',
    title: 'Работа с межведомственными запросами',
    description:
      'Просмотр запросов и ответов, полученных из ведомств',
    path: ROUTES.databaseInteragency,
  },
];
