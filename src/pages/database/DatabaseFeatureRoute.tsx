import {
  addBankClient,
  getInteragencyRequests,
} from '../../api/databaseApi';
import {
  DATABASE_SECTIONS,
  type DatabaseSectionId,
} from '../../navigation/databaseSections';
import { DatabaseFeaturePage } from './DatabaseFeaturePage';

type RoutableSectionId = Exclude<
  DatabaseSectionId,
  'clientSearch'
>;

const LOADERS: Record<RoutableSectionId, () => Promise<unknown>> = {
  clientAdd: () =>
    addBankClient({
      lastName: 'Иванов',
      firstName: 'Иван',
      patronymic: 'Иванович',
    }),
  interagency: () => getInteragencyRequests(),
};

type DatabaseFeatureRouteProps = {
  sectionId: DatabaseSectionId;
};

export function DatabaseFeatureRoute({ sectionId }: DatabaseFeatureRouteProps) {
  const section = DATABASE_SECTIONS.find((item) => item.id === sectionId);

  if (!section || sectionId === 'clientSearch') {
    return null;
  }

  return (
    <DatabaseFeaturePage
      section={section}
      loadData={LOADERS[sectionId]}
    />
  );
}
