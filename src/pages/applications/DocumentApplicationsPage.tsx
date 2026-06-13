import { ApplicationListPage } from '../../components/applications/ApplicationListPage';
import { DOCUMENT_APPLICATION_CONFIG } from '../../types/applications/documentConfig';

export function DocumentApplicationsPage() {
  return <ApplicationListPage config={DOCUMENT_APPLICATION_CONFIG} />;
}
