import MainPage from '../pages/MainPage.js';
import UpgradesPage from '../pages/UpgradesPage.js';
import StorePage from '../pages/StorePage.js';
import AchievementsPage from '../pages/AchievementsPage.js';
import OptionsPage from '../pages/OptionsPage.js';
import { TabType } from '../store/ui-state.js';

interface TabContentProps {
  tab: TabType;
}

export default function TabContent({ tab }: TabContentProps) {
  switch (tab) {
    case 'home':
      return <MainPage />;
    case 'upgrades':
      return <UpgradesPage />;
    case 'store':
      return <StorePage />;
    case 'achievements':
      return <AchievementsPage />;
    case 'options':
      return <OptionsPage />;
    default:
      return <MainPage />;
  }
}
