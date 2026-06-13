import type { ComponentType } from 'react';
import { REPORT_CODES } from '../../../api/reportsApi';
import type { ReportParamsComponentProps } from '../../../types/report';
import { ClientDataActualizationParams } from './ClientDataActualizationParams';
import { ClientDataChangesParams } from './ClientDataChangesParams';
import { CreditProductsParams } from './CreditProductsParams';
import { GenericReportParams } from './GenericReportParams';

const REPORT_PARAMS_BY_CODE: Record<
  string,
  ComponentType<ReportParamsComponentProps>
> = {
  [REPORT_CODES.CLIENT_DATA_ACTUALIZATION]: ClientDataActualizationParams,
  [REPORT_CODES.CREDIT_PRODUCTS]: CreditProductsParams,
  [REPORT_CODES.CLIENT_DATA_CHANGES]: ClientDataChangesParams,
};

export function getReportParamsComponent(code: string) {
  return REPORT_PARAMS_BY_CODE[code] ?? GenericReportParams;
}
