/**
 * Enum заявлений. Значения строго совпадают с backend
 * (ru.kubsu.contracts.enums.service.application) — сериализуются как имена констант.
 *
 * Подписи (*_LABELS) — для отображения на UI; при необходимости корректируются.
 */

/** Утилита: подпись для значения enum. Если кода нет в словаре — возвращает само значение. */
export function lookupLabel(
  labels: Record<string, string>,
  value: string | null | undefined
): string {
  if (!value) {
    return '';
  }
  return labels[value] ?? value;
}

export type EnumOption = { code: string; label: string };

function toOptions(
  values: readonly string[],
  labels: Record<string, string>
): EnumOption[] {
  return values.map((code) => ({ code, label: labels[code] ?? code }));
}

/* -------------------------------------------------------------------------- */
/* Бизнес-статус заявления (ApplicationStatusBusiness)                          */
/* -------------------------------------------------------------------------- */

export const STATUS_BUSINESS = {
  BAD: 'BAD',
  REJECTED: 'REJECTED',
  IN_QUEUE: 'IN_QUEUE',
  APPLIED: 'APPLIED',
} as const;

export type StatusBusiness =
  (typeof STATUS_BUSINESS)[keyof typeof STATUS_BUSINESS];

export const STATUS_BUSINESS_LABELS: Record<string, string> = {
  [STATUS_BUSINESS.BAD]: 'Некорректное',
  [STATUS_BUSINESS.REJECTED]: 'Отклонено',
  [STATUS_BUSINESS.IN_QUEUE]: 'В очереди',
  [STATUS_BUSINESS.APPLIED]: 'Применено',
};

export const STATUS_BUSINESS_OPTIONS = toOptions(
  Object.values(STATUS_BUSINESS),
  STATUS_BUSINESS_LABELS
);

/* -------------------------------------------------------------------------- */
/* Внутренний статус (ApplicationStatusInternal) — на UI не отображается        */
/* -------------------------------------------------------------------------- */

export const STATUS_INTERNAL = {
  APPLIED: 'APPLIED',
  DUPLICATE: 'DUPLICATE',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  IN_QUEUE: 'IN_QUEUE',
  FLC_EMPTY_REQUIRED: 'FLC_EMPTY_REQUIRED',
  FLC_INVALID_SUBMISSION: 'FLC_INVALID_SUBMISSION',
  CLIENT_NOT_FOUND: 'CLIENT_NOT_FOUND',
  ITN_NOT_ACTUAL: 'ITN_NOT_ACTUAL',
  INSURANCE_NUMBER_NOT_ACTUAL: 'INSURANCE_NUMBER_NOT_ACTUAL',
  ITN_NOT_REQUIRED: 'ITN_NOT_REQUIRED',
  INSURANCE_NUMBER_NOT_REQUIRED: 'INSURANCE_NUMBER_NOT_REQUIRED',
} as const;

export type StatusInternal =
  (typeof STATUS_INTERNAL)[keyof typeof STATUS_INTERNAL];

export const STATUS_INTERNAL_LABELS: Record<string, string> = {
  [STATUS_INTERNAL.APPLIED]: 'Применено',
  [STATUS_INTERNAL.DUPLICATE]: 'Дубликат',
  [STATUS_INTERNAL.INTERNAL_ERROR]: 'Внутренняя ошибка',
  [STATUS_INTERNAL.IN_QUEUE]: 'В очереди',
  [STATUS_INTERNAL.FLC_EMPTY_REQUIRED]: 'Не заполнены обязательные поля',
  [STATUS_INTERNAL.FLC_INVALID_SUBMISSION]: 'Некорректное заполнение',
  [STATUS_INTERNAL.CLIENT_NOT_FOUND]: 'Клиент не найден',
  [STATUS_INTERNAL.ITN_NOT_ACTUAL]: 'ИНН неактуален',
  [STATUS_INTERNAL.INSURANCE_NUMBER_NOT_ACTUAL]: 'СНИЛС неактуален',
  [STATUS_INTERNAL.ITN_NOT_REQUIRED]: 'ИНН не требуется',
  [STATUS_INTERNAL.INSURANCE_NUMBER_NOT_REQUIRED]: 'СНИЛС не требуется',
};

/* -------------------------------------------------------------------------- */
/* Тип заявления (ApplicationType)                                              */
/* -------------------------------------------------------------------------- */

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

export const APPLICATION_TYPE_OPTIONS = toOptions(
  Object.values(APPLICATION_TYPE),
  APPLICATION_TYPE_LABELS
);

/* -------------------------------------------------------------------------- */
/* Канал подачи (Channel)                                                       */
/* -------------------------------------------------------------------------- */

export const CHANNEL = {
  BRANCH: 'BRANCH',
  ONLINE: 'ONLINE',
  MOBILE: 'MOBILE',
  PHONE: 'PHONE',
  FILE: 'FILE',
} as const;

export type Channel = (typeof CHANNEL)[keyof typeof CHANNEL];

export const CHANNEL_LABELS: Record<string, string> = {
  [CHANNEL.BRANCH]: 'Отделение',
  [CHANNEL.ONLINE]: 'Интернет-банк',
  [CHANNEL.MOBILE]: 'Мобильное приложение',
  [CHANNEL.PHONE]: 'Контакт-центр',
  [CHANNEL.FILE]: 'Загрузка файлом',
};

export const CHANNEL_OPTIONS = toOptions(
  Object.values(CHANNEL),
  CHANNEL_LABELS
);

/* -------------------------------------------------------------------------- */
/* Пол (Gender)                                                                 */
/* -------------------------------------------------------------------------- */

export const GENDER = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  UNDEFINED: 'UNDEFINED',
} as const;

export type Gender = (typeof GENDER)[keyof typeof GENDER];

export const GENDER_LABELS: Record<string, string> = {
  [GENDER.MALE]: 'Мужской',
  [GENDER.FEMALE]: 'Женский',
  [GENDER.UNDEFINED]: 'Не указан',
};

export const GENDER_OPTIONS = toOptions(Object.values(GENDER), GENDER_LABELS);

/* -------------------------------------------------------------------------- */
/* Категория продукта (ProductCategory)                                         */
/* -------------------------------------------------------------------------- */

export const PRODUCT_CATEGORY = {
  CREDIT: 'CREDIT',
  DEPOSIT: 'DEPOSIT',
  CARD: 'CARD',
  INSURANCE: 'INSURANCE',
} as const;

export type ProductCategory =
  (typeof PRODUCT_CATEGORY)[keyof typeof PRODUCT_CATEGORY];

export const PRODUCT_CATEGORY_LABELS: Record<string, string> = {
  [PRODUCT_CATEGORY.CREDIT]: 'Кредит',
  [PRODUCT_CATEGORY.DEPOSIT]: 'Вклад',
  [PRODUCT_CATEGORY.CARD]: 'Карта',
  [PRODUCT_CATEGORY.INSURANCE]: 'Страхование',
};

export const PRODUCT_CATEGORY_OPTIONS = toOptions(
  Object.values(PRODUCT_CATEGORY),
  PRODUCT_CATEGORY_LABELS
);

/* -------------------------------------------------------------------------- */
/* Услуга (ServiceType, ServiceActionType)                                      */
/* -------------------------------------------------------------------------- */

export const SERVICE_TYPE = {
  CARD_SERVICE: 'CARD_SERVICE',
  SMS_INFO: 'SMS_INFO',
  ACCOUNT_STATEMENT: 'ACCOUNT_STATEMENT',
} as const;

export type ServiceType = (typeof SERVICE_TYPE)[keyof typeof SERVICE_TYPE];

export const SERVICE_TYPE_LABELS: Record<string, string> = {
  [SERVICE_TYPE.CARD_SERVICE]: 'Обслуживание карты',
  [SERVICE_TYPE.SMS_INFO]: 'SMS-информирование',
  [SERVICE_TYPE.ACCOUNT_STATEMENT]: 'Выписка по счёту',
};

export const SERVICE_TYPE_OPTIONS = toOptions(
  Object.values(SERVICE_TYPE),
  SERVICE_TYPE_LABELS
);

export const SERVICE_ACTION_TYPE = {
  REQUEST: 'REQUEST',
  DISABLE: 'DISABLE',
  CHANGE: 'CHANGE',
} as const;

export type ServiceActionType =
  (typeof SERVICE_ACTION_TYPE)[keyof typeof SERVICE_ACTION_TYPE];

export const SERVICE_ACTION_TYPE_LABELS: Record<string, string> = {
  [SERVICE_ACTION_TYPE.REQUEST]: 'Подключение',
  [SERVICE_ACTION_TYPE.DISABLE]: 'Отключение',
  [SERVICE_ACTION_TYPE.CHANGE]: 'Изменение',
};

export const SERVICE_ACTION_TYPE_OPTIONS = toOptions(
  Object.values(SERVICE_ACTION_TYPE),
  SERVICE_ACTION_TYPE_LABELS
);

/* -------------------------------------------------------------------------- */
/* Тип изменения данных (ClientChangeType)                                      */
/* -------------------------------------------------------------------------- */

export const CLIENT_CHANGE_TYPE = {
  ADDRESS: 'ADDRESS',
  PASSPORT: 'PASSPORT',
  NAME: 'NAME',
  ITN: 'ITN',
  INSURANCE_NUMBER: 'INSURANCE_NUMBER',
} as const;

export type ClientChangeType =
  (typeof CLIENT_CHANGE_TYPE)[keyof typeof CLIENT_CHANGE_TYPE];

export const CLIENT_CHANGE_TYPE_LABELS: Record<string, string> = {
  [CLIENT_CHANGE_TYPE.ADDRESS]: 'Адрес',
  [CLIENT_CHANGE_TYPE.PASSPORT]: 'Паспорт',
  [CLIENT_CHANGE_TYPE.NAME]: 'ФИО',
  [CLIENT_CHANGE_TYPE.ITN]: 'ИНН',
  [CLIENT_CHANGE_TYPE.INSURANCE_NUMBER]: 'СНИЛС',
};

export const CLIENT_CHANGE_TYPE_OPTIONS = toOptions(
  Object.values(CLIENT_CHANGE_TYPE),
  CLIENT_CHANGE_TYPE_LABELS
);

/* -------------------------------------------------------------------------- */
/* Документ (DocumentType, DocumentDeliveryType)                                */
/* -------------------------------------------------------------------------- */

export const DOCUMENT_TYPE = {
  ACCOUNT_STATEMENT: 'ACCOUNT_STATEMENT',
  REFERENCE: 'REFERENCE',
  CERTIFICATE: 'CERTIFICATE',
} as const;

export type DocumentType = (typeof DOCUMENT_TYPE)[keyof typeof DOCUMENT_TYPE];

export const DOCUMENT_TYPE_LABELS: Record<string, string> = {
  [DOCUMENT_TYPE.ACCOUNT_STATEMENT]: 'Выписка по счёту',
  [DOCUMENT_TYPE.REFERENCE]: 'Справка',
  [DOCUMENT_TYPE.CERTIFICATE]: 'Сертификат',
};

export const DOCUMENT_TYPE_OPTIONS = toOptions(
  Object.values(DOCUMENT_TYPE),
  DOCUMENT_TYPE_LABELS
);

export const DOCUMENT_DELIVERY_TYPE = {
  BRANCH: 'BRANCH',
  EMAIL: 'EMAIL',
  MAIL: 'MAIL',
  ONLINE: 'ONLINE',
} as const;

export type DocumentDeliveryType =
  (typeof DOCUMENT_DELIVERY_TYPE)[keyof typeof DOCUMENT_DELIVERY_TYPE];

export const DOCUMENT_DELIVERY_TYPE_LABELS: Record<string, string> = {
  [DOCUMENT_DELIVERY_TYPE.BRANCH]: 'В отделении',
  [DOCUMENT_DELIVERY_TYPE.EMAIL]: 'Электронная почта',
  [DOCUMENT_DELIVERY_TYPE.MAIL]: 'Почтой',
  [DOCUMENT_DELIVERY_TYPE.ONLINE]: 'Онлайн',
};

export const DOCUMENT_DELIVERY_TYPE_OPTIONS = toOptions(
  Object.values(DOCUMENT_DELIVERY_TYPE),
  DOCUMENT_DELIVERY_TYPE_LABELS
);

/* -------------------------------------------------------------------------- */
/* Претензия (ClaimType)                                                        */
/* -------------------------------------------------------------------------- */

export const CLAIM_TYPE = {
  TRANSACTION_DISPUTE: 'TRANSACTION_DISPUTE',
  COMPLAINT: 'COMPLAINT',
  DISPUTE: 'DISPUTE',
} as const;

export type ClaimType = (typeof CLAIM_TYPE)[keyof typeof CLAIM_TYPE];

export const CLAIM_TYPE_LABELS: Record<string, string> = {
  [CLAIM_TYPE.TRANSACTION_DISPUTE]: 'Спор по операции',
  [CLAIM_TYPE.COMPLAINT]: 'Жалоба',
  [CLAIM_TYPE.DISPUTE]: 'Спор',
};

export const CLAIM_TYPE_OPTIONS = toOptions(
  Object.values(CLAIM_TYPE),
  CLAIM_TYPE_LABELS
);

/* -------------------------------------------------------------------------- */
/* Полномочия (AuthorityType)                                                   */
/* -------------------------------------------------------------------------- */

export const AUTHORITY_TYPE = {
  POA_ACCOUNT_ACCESS: 'POA_ACCOUNT_ACCESS',
} as const;

export type AuthorityType =
  (typeof AUTHORITY_TYPE)[keyof typeof AUTHORITY_TYPE];

export const AUTHORITY_TYPE_LABELS: Record<string, string> = {
  [AUTHORITY_TYPE.POA_ACCOUNT_ACCESS]: 'Доверенность на доступ к счёту',
};

export const AUTHORITY_TYPE_OPTIONS = toOptions(
  Object.values(AUTHORITY_TYPE),
  AUTHORITY_TYPE_LABELS
);
