/** Логин инициатора межведомственных запросов (до появления auth в UI). */
export const INITIATOR_LOGIN =
  process.env.REACT_APP_INITIATOR_LOGIN?.trim() || 'operator';
