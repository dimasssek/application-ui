import { SectionHubPage } from '../components/main/SectionHubPage';
import { MAIN_MENU_SECTIONS } from '../navigation/navItems';

export function MainMenuPage() {
  return <SectionHubPage title="Главное меню" sections={MAIN_MENU_SECTIONS} />;
}
