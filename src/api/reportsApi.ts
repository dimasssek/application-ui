import type { ReportDefinition } from '../types/report';

/** Коды отчётов. По коду форма параметров выбирается на UI. */
export const REPORT_CODES = {
  CLIENT_DATA_ACTUALIZATION: 'CLIENT_DATA_ACTUALIZATION',
  CREDIT_PRODUCTS: 'CREDIT_PRODUCTS',
  CLIENT_DATA_CHANGES: 'CLIENT_DATA_CHANGES',
} as const;

export type ReportCode = (typeof REPORT_CODES)[keyof typeof REPORT_CODES];

/** Заглушка до подключения gateway. Заменить на реальный HTTP-запрос. */
const MOCK_REPORTS: ReportDefinition[] = [
  {
    code: REPORT_CODES.CLIENT_DATA_ACTUALIZATION,
    name: 'Сведения об актуализации клиентских данных через внешние ведомства',
  },
  {
    code: REPORT_CODES.CREDIT_PRODUCTS,
    name: 'Сведения о кредитных продуктах физических лиц',
  },
  {
    code: REPORT_CODES.CLIENT_DATA_CHANGES,
    name: 'Сведения об изменении клиентских данных',
  },
];

export async function getAllReports(): Promise<ReportDefinition[]> {
  await delay(300);
  return [...MOCK_REPORTS];
}

/**
 * Заглушка: реальный backend будет возвращать массив байт docx и заголовки
 * с именем файла. Сейчас функция ничего не делает — подключим позже.
 */
export async function generateReport(
  code: string,
  params: Record<string, unknown>
): Promise<void> {
  await delay(300);
  // eslint-disable-next-line no-console
  console.info('generateReport (stub)', { code, params });
}

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
