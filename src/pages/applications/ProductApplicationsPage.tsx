import { ApplicationListPage } from '../../components/applications/ApplicationListPage';
import { PRODUCT_APPLICATION_CONFIG } from '../../types/applications/productConfig';

export function ProductApplicationsPage() {
  return <ApplicationListPage config={PRODUCT_APPLICATION_CONFIG} />;
}
