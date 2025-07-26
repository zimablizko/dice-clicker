import { useDispatch, useSelector } from 'react-redux';
import ChipCounter from '../components/header/ChipCounter.js';
import AchievementListener from '../components/main/AchievementListener.js';
import Snackbar from '../components/Snackbar.js';
import Topbar from '../components/Topbar.js';
import TabContent from '../components/TabContent.js';
import { hideSnackbar, SnackbarState } from '../store/snackbar-state.js';
import { UIState, closeTab } from '../store/ui-state.js';

export default function RootLayout() {
  const dispatch = useDispatch();
  const snackbarState = useSelector(
    (state: { snackbar: SnackbarState }) => state.snackbar,
  );
  const { visibleTabs, activeTab } = useSelector(
    (state: { ui: UIState }) => state.ui,
  );

  const isDesktop = window.innerWidth > 600;

  return (
    <>
      <Topbar />
      <header>
        <ChipCounter />
      </header>
      <main className={isDesktop ? 'desktop-layout' : 'mobile-layout'}>
        {isDesktop ? (
          <div className="tabs-container">
            {visibleTabs.map((tab) => (
              <div
                key={tab}
                className={`tab-panel ${tab === activeTab ? 'active' : ''}`}
              >
                <div className="tab-header">
                  <h3>{tab.charAt(0).toUpperCase() + tab.slice(1)}</h3>
                  {visibleTabs.length > 1 && (
                    <button
                      className="close-tab-btn"
                      onClick={() => dispatch(closeTab(tab))}
                    >
                      ×
                    </button>
                  )}
                </div>
                <div className="tab-content">
                  <TabContent tab={tab} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mobile-tab-content">
            <TabContent tab={activeTab} />
          </div>
        )}

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
