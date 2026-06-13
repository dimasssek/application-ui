import { SectionHubPage } from '../../components/main/SectionHubPage';
import {
  APPLICATION_SECTIONS,
  APPLICATIONS_HUB_TITLE,
} from '../../navigation/applicationSections';

export function ApplicationsHubPage() {
  return (
    <SectionHubPage
      title={APPLICATIONS_HUB_TITLE}
      sections={APPLICATION_SECTIONS}
    />
  );
}
