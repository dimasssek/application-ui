/**
 * Поля из таблицы `application` (общая часть всех заявлений).
 * Названия — точно как в SQL (snake_case).
 *
 * Поле `reason` добавлено по требованию (в SQL отсутствует), хранит
 * подробное разъяснение по статусу.
 *
 * На фронте не отображаются: id, client_id, status_internal.
 */
export type ApplicationCommon = {
  id: string;
  client_id: string;
  number: string;
  application_type: string;
  channel: string;
  status_internal: string;
  status_business: string;
  reason: string;
  created_date: string;
  closed_date: string | null;
};

/** Моковый клиент: клиента не выбираем в UI, подставляем этот UUID. */
export const MOCK_CLIENT_ID = '00000000-0000-0000-0000-000000000001';
