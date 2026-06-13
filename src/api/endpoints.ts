/**
 * Пути backend через gateway (http://localhost:8088).
 *
 * client-service: gateway срезает префикс /api/v1 (StripPrefix=2).
 * application-service: пути проходят без изменений.
 */
export const ENDPOINTS = {
  clients: '/api/v1/clients',
  externalRequests: '/api/v1/external-requests',
  batchRequests: '/api/v1/batch-requests',

  product: '/product',
  service: '/service',
  profileChange: '/profile-change',
  document: '/document',
  claim: '/claim',
  authority: '/authority',
  generalCheck: '/general-check',
  applicationsUpload: '/applications/upload',
} as const;
