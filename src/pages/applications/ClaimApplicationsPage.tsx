import { ApplicationListPage } from '../../components/applications/ApplicationListPage';
import { CLAIM_APPLICATION_CONFIG } from '../../types/applications/claimConfig';

export function ClaimApplicationsPage() {
  return <ApplicationListPage config={CLAIM_APPLICATION_CONFIG} />;
}
