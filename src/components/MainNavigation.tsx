import { NavLink } from 'react-router-dom';

function MainNavigation() {
  return (
    <header className="navigation">
      <nav>
        <ul className="list">
          <li>
            <NavLink
              to="/dice-clicker"
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dice-clicker/upgrades"
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              Upgrades
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dice-clicker/achievements"
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              Achievements
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dice-clicker/options"
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              Options
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
