import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Achievement } from '../../common/enums/achievement.enum.js';
import { GameState } from '../../store/model/game-state.model.js';

function MainNavigation() {
  const payout1 = useSelector(
    (state: { gamestate: GameState }) =>
      state.gamestate.achievements[Achievement.Payout1],
  );

  return (
    <section className="navigation">
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
          {payout1 && (
            <li>
              <NavLink
                to="/dice-clicker/store"
                className={({ isActive }) => (isActive ? 'active' : undefined)}
              >
                Store
              </NavLink>
            </li>
          )}
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
    </section>
  );
}

export default MainNavigation;
