/**
 * Enum клиентского сервиса. Значения строго совпадают с backend
 * (ru.kubsu.contracts.enums.service.client) — сериализуются как имена констант.
 */

export type EnumOption = { code: string; label: string };

function toOptions(
  values: readonly string[],
  labels: Record<string, string>
): EnumOption[] {
  return values.map((code) => ({ code, label: labels[code] ?? code }));
}

/** Подпись для значения enum. Если кода нет в словаре — возвращает само значение. */
export function lookupLabel(
  labels: Record<string, string>,
  value: string | null | undefined
): string {
  if (!value) {
    return '';
  }
  return labels[value] ?? value;
}

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
/* Статус клиента (ClientStatus)                                                 */
/* -------------------------------------------------------------------------- */

export const CLIENT_STATUS = {
  ACTUAL: 'ACTUAL',
  DELETED: 'DELETED',
} as const;

export type ClientStatus =
  (typeof CLIENT_STATUS)[keyof typeof CLIENT_STATUS];

export const CLIENT_STATUS_LABELS: Record<string, string> = {
  [CLIENT_STATUS.ACTUAL]: 'Актуальный',
  [CLIENT_STATUS.DELETED]: 'Удалён',
};

export const CLIENT_STATUS_OPTIONS = toOptions(
  Object.values(CLIENT_STATUS),
  CLIENT_STATUS_LABELS
);

/* -------------------------------------------------------------------------- */
/* Источник внешнего запроса (SourceType)                                       */
/* -------------------------------------------------------------------------- */

export const SOURCE_TYPE = {
  FNS: 'FNS',
  EPGU: 'EPGU',
} as const;

export type SourceType = (typeof SOURCE_TYPE)[keyof typeof SOURCE_TYPE];

export const SOURCE_TYPE_LABELS: Record<string, string> = {
  [SOURCE_TYPE.FNS]: 'ФНС',
  [SOURCE_TYPE.EPGU]: 'ЕПГУ',
};

export const SOURCE_TYPE_OPTIONS = toOptions(
  Object.values(SOURCE_TYPE),
  SOURCE_TYPE_LABELS
);

/* -------------------------------------------------------------------------- */
/* Статус запроса (RequestStatus)                                               */
/* -------------------------------------------------------------------------- */

export const REQUEST_STATUS = {
  PROCESSING: 'PROCESSING',
  SENT: 'SENT',
  RECEIVED: 'RECEIVED',
  ERROR: 'ERROR',
  DONE: 'DONE',
} as const;

export type RequestStatus =
  (typeof REQUEST_STATUS)[keyof typeof REQUEST_STATUS];

export const REQUEST_STATUS_LABELS: Record<string, string> = {
  [REQUEST_STATUS.PROCESSING]: 'В обработке',
  [REQUEST_STATUS.SENT]: 'Отправлен',
  [REQUEST_STATUS.RECEIVED]: 'Получен ответ',
  [REQUEST_STATUS.ERROR]: 'Ошибка',
  [REQUEST_STATUS.DONE]: 'Завершён',
};

export const REQUEST_STATUS_OPTIONS = toOptions(
  Object.values(REQUEST_STATUS),
  REQUEST_STATUS_LABELS
);

/* -------------------------------------------------------------------------- */
/* Результат запроса (RequestOutcome)                                           */
/* -------------------------------------------------------------------------- */

export const REQUEST_OUTCOME = {
  PENDING: 'PENDING',
  UPDATED: 'UPDATED',
  ACTUAL: 'ACTUAL',
  NOT_FOUND: 'NOT_FOUND',
  ERROR: 'ERROR',
} as const;

export type RequestOutcome =
  (typeof REQUEST_OUTCOME)[keyof typeof REQUEST_OUTCOME];

export const REQUEST_OUTCOME_LABELS: Record<string, string> = {
  [REQUEST_OUTCOME.PENDING]: 'Ожидает',
  [REQUEST_OUTCOME.UPDATED]: 'Обновлён',
  [REQUEST_OUTCOME.ACTUAL]: 'Актуален',
  [REQUEST_OUTCOME.NOT_FOUND]: 'Не найден',
  [REQUEST_OUTCOME.ERROR]: 'Ошибка',
};

export const REQUEST_OUTCOME_OPTIONS = toOptions(
  Object.values(REQUEST_OUTCOME),
  REQUEST_OUTCOME_LABELS
);

/* -------------------------------------------------------------------------- */
/* Тип запроса (RequestType)                                                    */
/* -------------------------------------------------------------------------- */

export const REQUEST_TYPE = {
  BATCH: 'BATCH',
  MANUAL: 'MANUAL',
} as const;

export type RequestType = (typeof REQUEST_TYPE)[keyof typeof REQUEST_TYPE];

export const REQUEST_TYPE_LABELS: Record<string, string> = {
  [REQUEST_TYPE.BATCH]: 'Пакетный',
  [REQUEST_TYPE.MANUAL]: 'Ручной',
};

export const REQUEST_TYPE_OPTIONS = toOptions(
  Object.values(REQUEST_TYPE),
  REQUEST_TYPE_LABELS
);
