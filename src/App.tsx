import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { MainMenuPage } from './pages/MainMenuPage';
import { ApplicationsHubPage } from './pages/applications/ApplicationsHubPage';
import { ApplicationsUploadPage } from './pages/applications/ApplicationsUploadPage';
import { ApplicationsRunPage } from './pages/applications/ApplicationsRunPage';
import { ProductApplicationsPage } from './pages/applications/ProductApplicationsPage';
import { ServiceApplicationsPage } from './pages/applications/ServiceApplicationsPage';
import { ProfileChangeApplicationsPage } from './pages/applications/ProfileChangeApplicationsPage';
import { DocumentApplicationsPage } from './pages/applications/DocumentApplicationsPage';
import { ClaimApplicationsPage } from './pages/applications/ClaimApplicationsPage';
import { AuthorityApplicationsPage } from './pages/applications/AuthorityApplicationsPage';
import { InteragencyDetailPage } from './pages/database/InteragencyDetailPage';
import { InteragencyManualCreatePage } from './pages/database/InteragencyManualCreatePage';
import { InteragencySearchPage } from './pages/database/InteragencySearchPage';
import { DatabaseHubPage } from './pages/database/DatabaseHubPage';
import { ClientAddPage } from './pages/database/ClientAddPage';
import { ClientEditPage } from './pages/database/ClientEditPage';
import { ClientSearchPage } from './pages/database/ClientSearchPage';
import { ReportsPage } from './pages/ReportsPage';
import { ROUTES } from './navigation/routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path={ROUTES.home} element={<MainMenuPage />} />
          <Route path={ROUTES.database} element={<DatabaseHubPage />} />
          <Route
            path={ROUTES.databaseClientSearch}
            element={<ClientSearchPage />}
          />
          <Route
            path={ROUTES.databaseClientEdit}
            element={<ClientEditPage />}
          />
          <Route
            path={ROUTES.databaseClientAdd}
            element={<ClientAddPage />}
          />
          <Route
            path={ROUTES.databaseInteragency}
            element={<InteragencySearchPage />}
          />
          <Route
            path={ROUTES.databaseInteragencyManualCreate}
            element={<InteragencyManualCreatePage />}
          />
          <Route
            path={ROUTES.databaseInteragencyDetail}
            element={<InteragencyDetailPage />}
          />
          <Route path={ROUTES.applications} element={<ApplicationsHubPage />} />
          <Route
            path={ROUTES.applicationsUpload}
            element={<ApplicationsUploadPage />}
          />
          <Route
            path={ROUTES.applicationsRun}
            element={<ApplicationsRunPage />}
          />
          <Route
            path={ROUTES.applicationsProducts}
            element={<ProductApplicationsPage />}
          />
          <Route
            path={ROUTES.applicationsServices}
            element={<ServiceApplicationsPage />}
          />
          <Route
            path={ROUTES.applicationsProfileChanges}
            element={<ProfileChangeApplicationsPage />}
          />
          <Route
            path={ROUTES.applicationsDocuments}
            element={<DocumentApplicationsPage />}
          />
          <Route
            path={ROUTES.applicationsClaims}
            element={<ClaimApplicationsPage />}
          />
          <Route
            path={ROUTES.applicationsAuthorities}
            element={<AuthorityApplicationsPage />}
          />
          <Route path={ROUTES.reports} element={<ReportsPage />} />
          <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
