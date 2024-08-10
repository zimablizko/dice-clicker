import { NavLink } from 'react-router-dom';

function MainNavigation() {
  return (
    <header className="navigation">
      <nav>
        <ul className="list">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/upgrades"
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              Upgrades
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/achievements"
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              Achievements
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/options"
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
