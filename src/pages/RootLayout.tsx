import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header.js';
import MainNavigation from '../components/header/MainNavigation.js';
import PointCounter from '../components/header/PointCounter.js';
import AchievementListener from '../components/main/AchievementListener.js';
import Snackbar from '../components/Snackbar.js';
import { hideSnackbar, SnackbarState } from '../store/snackbar-state.js';

export default function RootLayout() {
  const dispatch = useDispatch();
  const snackbarState = useSelector(
    (state: { snackbar: SnackbarState }) => state.snackbar,
  );

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
        <Snackbar
          message={snackbarState.message}
          isOpen={snackbarState.isOpen}
          onClose={() => dispatch(hideSnackbar())}
        />
      </main>
    </>
  );
}
