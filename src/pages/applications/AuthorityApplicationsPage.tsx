import { ApplicationListPage } from '../../components/applications/ApplicationListPage';
import { AUTHORITY_APPLICATION_CONFIG } from '../../types/applications/authorityConfig';

export function AuthorityApplicationsPage() {
  return <ApplicationListPage config={AUTHORITY_APPLICATION_CONFIG} />;
}
