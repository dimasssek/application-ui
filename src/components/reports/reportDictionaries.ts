/**
 * Справочники-заглушки для параметров отчётов.
 * Будут заменены на данные с backend.
 */
import {
  STATUS_BUSINESS_OPTIONS,
} from '../../types/applications/enums';

export type ReportOption = {
  code: string;
  label: string;
};

/** Ведомство-получатель данных при актуализации. */
export const DEPARTMENT_OPTIONS: ReportOption[] = [
  { code: 'ALL', label: 'Все' },
  { code: 'MVD', label: 'МВД (паспортный стол)' },
  { code: 'FNS', label: 'ФНС России' },
  { code: 'PFR', label: 'Пенсионный фонд России' },
  { code: 'ROSREESTR', label: 'Росреестр' },
  { code: 'ZAGS', label: 'ЗАГС' },
  { code: 'MINJUST', label: 'Минюст' },
];

/** Дефолт для поля «ведомство»: «Все». */
export const DEPARTMENT_DEFAULT = 'ALL';

/** Типы изменяемых клиентских данных. */
export const CLIENT_DATA_CHANGE_TYPE_OPTIONS: ReportOption[] = [
  { code: 'FIO', label: 'ФИО' },
  { code: 'PASSPORT', label: 'Паспортные данные' },
  { code: 'ADDRESS_REG', label: 'Адрес регистрации' },
  { code: 'ADDRESS_FACT', label: 'Адрес фактического проживания' },
  { code: 'CONTACTS', label: 'Контактные данные' },
  { code: 'MARITAL', label: 'Семейное положение' },
  { code: 'DOCUMENTS', label: 'Документы' },
];

/** Бизнес-статусы заявлений (берём из applications, чтобы был один источник правды). */
export const APPLICATION_STATUS_OPTIONS: ReportOption[] = STATUS_BUSINESS_OPTIONS;

/** Форма построения отчёта (статистическая или детализированная). */
export const REPORT_FORM_OPTIONS: ReportOption[] = [
  { code: 'STATISTIC', label: 'Статистическая' },
  { code: 'DETAILED', label: 'Детализированная' },
];

export const REPORT_FORM_CODE = {
  STATISTIC: 'STATISTIC',
  DETAILED: 'DETAILED',
} as const;
