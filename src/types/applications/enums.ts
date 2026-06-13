/**
 * Enum-заглушки. Реальные значения согласуем с backend и заменим позже.
 * Сейчас на UI отображаются через *_LABELS.
 */

export const STATUS_BUSINESS = {
  QUEUED: 'QUEUED',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE',
  REJECTED: 'REJECTED',
} as const;

export type StatusBusiness =
  (typeof STATUS_BUSINESS)[keyof typeof STATUS_BUSINESS];

export const STATUS_BUSINESS_LABELS: Record<string, string> = {
  [STATUS_BUSINESS.QUEUED]: 'В очереди',
  [STATUS_BUSINESS.IN_PROGRESS]: 'В обработке',
  [STATUS_BUSINESS.DONE]: 'Завершено',
  [STATUS_BUSINESS.REJECTED]: 'Отклонено',
};

export const STATUS_BUSINESS_OPTIONS = Object.values(STATUS_BUSINESS).map(
  (code) => ({ code, label: STATUS_BUSINESS_LABELS[code] })
);

/** Внутренний статус — на UI не отображаем, только хранится в DTO. */
export const STATUS_INTERNAL = {
  NEW: 'NEW',
  ENRICHING: 'ENRICHING',
  READY: 'READY',
  FAILED: 'FAILED',
} as const;

export type StatusInternal =
  (typeof STATUS_INTERNAL)[keyof typeof STATUS_INTERNAL];

export const APPLICATION_TYPE = {
  PRODUCT: 'PRODUCT',
  SERVICE: 'SERVICE',
  PROFILE_CHANGE: 'PROFILE_CHANGE',
  DOCUMENT: 'DOCUMENT',
  CLAIM: 'CLAIM',
  AUTHORITY: 'AUTHORITY',
} as const;

export type ApplicationType =
  (typeof APPLICATION_TYPE)[keyof typeof APPLICATION_TYPE];

export const APPLICATION_TYPE_LABELS: Record<string, string> = {
  [APPLICATION_TYPE.PRODUCT]: 'Банковский продукт',
  [APPLICATION_TYPE.SERVICE]: 'Банковская услуга',
  [APPLICATION_TYPE.PROFILE_CHANGE]: 'Изменение данных клиента',
  [APPLICATION_TYPE.DOCUMENT]: 'Получение документа',
  [APPLICATION_TYPE.CLAIM]: 'Претензия или обращение',
  [APPLICATION_TYPE.AUTHORITY]: 'Полномочия и доступы',
};

export const APPLICATION_TYPE_OPTIONS = Object.values(APPLICATION_TYPE).map(
  (code) => ({ code, label: APPLICATION_TYPE_LABELS[code] })
);

export const CHANNEL = {
  ONLINE: 'ONLINE',
  MOBILE: 'MOBILE',
  BRANCH: 'BRANCH',
  PHONE: 'PHONE',
} as const;

export type Channel = (typeof CHANNEL)[keyof typeof CHANNEL];

export const CHANNEL_LABELS: Record<string, string> = {
  [CHANNEL.ONLINE]: 'Интернет-банк',
  [CHANNEL.MOBILE]: 'Мобильное приложение',
  [CHANNEL.BRANCH]: 'Отделение',
  [CHANNEL.PHONE]: 'Контакт-центр',
};

export const CHANNEL_OPTIONS = Object.values(CHANNEL).map((code) => ({
  code,
  label: CHANNEL_LABELS[code],
}));

export const CURRENCY = {
  RUB: 'RUB',
  USD: 'USD',
  EUR: 'EUR',
} as const;

export const CURRENCY_LABELS: Record<string, string> = {
  [CURRENCY.RUB]: 'RUB',
  [CURRENCY.USD]: 'USD',
  [CURRENCY.EUR]: 'EUR',
};

export const CURRENCY_OPTIONS = Object.values(CURRENCY).map((code) => ({
  code,
  label: CURRENCY_LABELS[code],
}));

/** Утилита: подпись для значения enum-поля. Если кода нет — возвращает само значение. */
export function lookupLabel(
  labels: Record<string, string>,
  value: string | null | undefined
): string {
  if (!value) {
    return '';
  }
  return labels[value] ?? value;
}
