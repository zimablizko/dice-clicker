import { Outlet } from 'react-router-dom';
import AchievementListener from '../components/AchievementListener.js';
import Header from '../components/Header.js';
import MainNavigation from '../components/MainNavigation.js';
import PointCounter from '../components/PointCounter.js';

export default function RootLayout() {
  // const navigation = useNavigation();

  return (
    <div className="game-screen">
      <Header />
      <MainNavigation />
      <PointCounter />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}

        <Outlet />
        <AchievementListener />
      </main>
    </div>
  );
}
