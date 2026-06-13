import { ApplicationListPage } from '../../components/applications/ApplicationListPage';
import { SERVICE_APPLICATION_CONFIG } from '../../types/applications/serviceConfig';

export function ServiceApplicationsPage() {
  return <ApplicationListPage config={SERVICE_APPLICATION_CONFIG} />;
}
