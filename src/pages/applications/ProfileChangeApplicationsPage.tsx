import { ApplicationListPage } from '../../components/applications/ApplicationListPage';
import { PROFILE_CHANGE_APPLICATION_CONFIG } from '../../types/applications/profileChangeConfig';

export function ProfileChangeApplicationsPage() {
  return <ApplicationListPage config={PROFILE_CHANGE_APPLICATION_CONFIG} />;
}
