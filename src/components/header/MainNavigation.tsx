import { useSelector, useDispatch } from 'react-redux';
import { Achievement } from '../../common/enums/achievement.enum.js';
import { GameState } from '../../store/model/game-state.model.js';
import { setActiveTab } from '../../store/ui-state.js'; // New slice

export type TabType = 'home' | 'upgrades' | 'store' | 'achievements' | 'options';

function MainNavigation() {
  const dispatch = useDispatch();
  const activeTab = useSelector((state: { ui: UIState }) => state.ui.activeTab);
  const payout1 = useSelector(
    (state: { gamestate: GameState }) =>
      state.gamestate.achievements[Achievement.Payout1],
  );

  const handleTabClick = (tab: TabType) => {
    dispatch(setActiveTab(tab));
  };

  return (
    <section className="navigation">
      <nav>
        <ul className="list">
          <li>
            <button
              className={activeTab === 'home' ? 'active' : ''}
              onClick={() => handleTabClick('home')}
            >
              Home
            </button>
          </li>
          <li>
            <button
              className={activeTab === 'upgrades' ? 'active' : ''}
              onClick={() => handleTabClick('upgrades')}
            >
              Upgrades
            </button>
          </li>
          {payout1 && (
            <li>
              <button
                className={activeTab === 'store' ? 'active' : ''}
                onClick={() => handleTabClick('store')}
              >
                Store
              </button>
            </li>
          )}
          <li>
            <button
              className={activeTab === 'achievements' ? 'active' : ''}
              onClick={() => handleTabClick('achievements')}
            >
              Achievements
            </button>
          </li>
          <li>
            <button
              className={activeTab === 'options' ? 'active' : ''}
              onClick={() => handleTabClick('options')}
            >
              Options
            </button>
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default MainNavigation;
