import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { GAME_SETTINGS } from '../../common/consts/game-settings.const.js';
import { Achievement } from '../../common/enums/achievement.enum.js';
import { getCoinReward } from '../../common/utils/coin-helper.js';
import { formatNumber } from '../../common/utils/formatter.js';
import { GameState } from '../../store/model/game-state.model.js';
import ResultModal from '../main/ResultModal.js';

export default function ChipCounter() {
  const gameState = useSelector(
    (state: { gamestate: GameState }) => state.gamestate,
  );
  const chips = useSelector(
    (state: { gamestate: GameState }) => state.gamestate.resources.chips,
  );
  const chips100Achievement = useSelector(
    (state: { gamestate: GameState }) =>
      state.gamestate.achievements[Achievement.Chips100],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const winDialog = useRef<any>(null);

  const onPayout = () => {
    if (checkWinCondition()) {
      winDialog.current!.open();
    }
  };

  const checkWinCondition = () =>
    gameState.resources.chips >= GAME_SETTINGS.winCondition;

  const winPercent = (chips / GAME_SETTINGS.winCondition) * 100;
  return (
    <>
      <section>
        <p className="chips">
          Chips: {formatNumber(chips)}
          <br />
          <span className="wincon-label">
            {' '}
            ({formatNumber(GAME_SETTINGS.winCondition)} chips for payout)
          </span>
          {chips100Achievement && (
            <span>
              <br />
              <progress
                className="wincon-progress-bar"
                value={chips}
                max={GAME_SETTINGS.winCondition}
              ></progress>
              <br />
              {winPercent.toFixed(2)}% to payout
            </span>
          )}
          {checkWinCondition() && (
            <>
              <br />
              <button className="btn payout-btn" onClick={onPayout}>
                Payout
              </button>
            </>
          )}
        </p>
      </section>
      <ResultModal ref={winDialog} coinReward={getCoinReward(gameState)} />
    </>
  );
}
