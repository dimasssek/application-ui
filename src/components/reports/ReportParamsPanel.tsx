import type { ReportDefinition } from '../../types/report';
import { getReportParamsComponent } from './params/reportParamsRegistry';

type ReportParamsPanelProps = {
  report: ReportDefinition;
};

export function ReportParamsPanel({ report }: ReportParamsPanelProps) {
  const ParamsComponent = getReportParamsComponent(report.code);

  return <ParamsComponent key={report.code} report={report} />;
}
