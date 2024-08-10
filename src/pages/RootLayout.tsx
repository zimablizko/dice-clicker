import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import MainNavigation from '../components/MainNavigation';

export default function RootLayout() {
  // const navigation = useNavigation();

  return (
    <div className="game-screen">
      <Header />
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}

        <Outlet />
      </main>
    </div>
  );
}
