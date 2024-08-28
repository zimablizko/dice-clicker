import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header.js';
import MainNavigation from '../components/header/MainNavigation.js';
import PointCounter from '../components/header/PointCounter.js';
import AchievementListener from '../components/main/AchievementListener.js';

export default function RootLayout() {
  // const navigation = useNavigation();

  return (
    <>
      <header>
        <Header />
        <MainNavigation />
        <PointCounter />
      </header>
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}

        <Outlet />
        <AchievementListener />
      </main>
    </>
  );
}
