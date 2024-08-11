import { Outlet } from 'react-router-dom';
import AchievementListener from '../components/AchievementListener';
import Header from '../components/Header';
import MainNavigation from '../components/MainNavigation';
import PointCounter from '../components/PointCounter';

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
