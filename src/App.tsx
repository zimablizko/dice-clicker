import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AchievementsPage from './pages/AchievementsPage.js';
import ErrorPage from './pages/ErrorPage.js';
import MainPage from './pages/MainPage.js';
import OptionsPage from './pages/OptionsPage.js';
import RootLayout from './pages/RootLayout.js';
import StorePage from './pages/StorePage.js';
import UpgradesPage from './pages/UpgradesPage.js';
import './styles/App.scss';

const router = createBrowserRouter([
  {
    path: '/dice-clicker',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: 'upgrades',
        element: <UpgradesPage />,
      },
      {
        path: 'achievements',
        element: <AchievementsPage />,
      },
      {
        path: 'options',
        element: <OptionsPage />,
      },
      {
        path: 'store',
        element: <StorePage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
