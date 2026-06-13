import { ROUTES } from './routes';

export type ApplicationSectionId =
  | 'upload'
  | 'product'
  | 'service'
  | 'profileChange'
  | 'document'
  | 'claim'
  | 'authority'
  | 'run';

export type ApplicationSection = {
  id: ApplicationSectionId;
  title: string;
  description: string;
  path: string;
};

export const APPLICATIONS_HUB_TITLE = 'Обработка заявлений';

export const APPLICATION_SECTIONS: ApplicationSection[] = [
  {
    id: 'upload',
    title: 'Загрузка заявлений',
    description: 'Загрузка и первичная обработка банковских заявлений',
    path: ROUTES.applicationsUpload,
  },
  {
    id: 'product',
    title: 'Заявления на банковский продукт',
    description: 'Кредиты, вклады, карты и другие банковские продукты',
    path: ROUTES.applicationsProducts,
  },
  {
    id: 'service',
    title: 'Заявления на банковскую услугу',
    description: 'Подключение, изменение и отключение банковских услуг',
    path: ROUTES.applicationsServices,
  },
  {
    id: 'profileChange',
    title: 'Заявления на изменение данных',
    description: 'Корректировка персональных данных, адресов и контактов',
    path: ROUTES.applicationsProfileChanges,
  },
  {
    id: 'document',
    title: 'Заявления на получение документа',
    description: 'Справки, выписки и другие банковские документы',
    path: ROUTES.applicationsDocuments,
  },
  {
    id: 'claim',
    title: 'Претензии и обращения',
    description: 'Жалобы, претензии и обращения клиентов',
    path: ROUTES.applicationsClaims,
  },
  {
    id: 'authority',
    title: 'Заявления на полномочия',
    description: 'Оформление и продление полномочий доверенных лиц',
    path: ROUTES.applicationsAuthorities,
  },
  {
    id: 'run',
    title: 'Запуск обработки',
    description: 'Запуск пакетной обработки заявлений по дате и типу',
    path: ROUTES.applicationsRun,
  },
];
