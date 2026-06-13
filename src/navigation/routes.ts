export const ROUTES = {
  home: '/',
  database: '/database',
  databaseClientSearch: '/database/client-search',
  databaseClientEdit: '/database/client-search/:clientId/edit',
  databaseClientAdd: '/database/client-add',
  databaseInteragency: '/database/interagency',
  applications: '/applications',
  applicationsUpload: '/applications/upload',
  applicationsRun: '/applications/run',
  applicationsProducts: '/applications/products',
  applicationsServices: '/applications/services',
  applicationsProfileChanges: '/applications/profile-changes',
  applicationsDocuments: '/applications/documents',
  applicationsClaims: '/applications/claims',
  applicationsAuthorities: '/applications/authorities',
  reports: '/reports',
} as const;

export type AppRoutePath = (typeof ROUTES)[keyof typeof ROUTES];
