import { SectionHubPage } from '../../components/main/SectionHubPage';
import {
  DATABASE_HUB_TITLE,
  DATABASE_SECTIONS,
} from '../../navigation/databaseSections';

export function DatabaseHubPage() {
  return (
    <SectionHubPage title={DATABASE_HUB_TITLE} sections={DATABASE_SECTIONS} />
  );
}
