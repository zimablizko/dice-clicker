import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AchievementsPage from './pages/AchievementsPage';
import ErrorPage from './pages/ErrorPage';
import MainPage from './pages/MainPage';
import OptionsPage from './pages/OptionsPage';
import RootLayout from './pages/RootLayout';
import UpgradesPage from './pages/UpgradesPage';
import './styles/App.scss';

const router = createBrowserRouter([
  {
    path: '/',
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
