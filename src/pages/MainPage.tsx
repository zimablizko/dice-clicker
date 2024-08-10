import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { GAME_SETTINGS } from '../common/consts/game-settings.const';
import { Dice } from '../common/model/dice.model';
import { checkForCombo } from '../common/utils/combo-helper';
import { calculatePoints } from '../common/utils/point-calculator';
import DiceBoard from '../components/DiceBoard';
import ResultModal from '../components/ResultModal';
import { changePoints, changeStats } from '../store/game-state';
import { GameState } from '../store/model/game-state.model';

export default function MainPage() {
  const dispatch = useDispatch();
  const gameState = useSelector(
    (state: { gamestate: GameState }) => state.gamestate,
  );

  const winDialog = useRef<any>(null);

  const [dices, setDices] = useState<Dice[]>([]);
  const [isCooldown, setIsCooldown] = useState(0);

  const getRollResult = () => Math.floor(Math.random() * 6) + 1;

  const checkRollBtnDisabled = () => isCooldown > 0;

  const checkWinCondition = () =>
    gameState.points >= GAME_SETTINGS.winCondition;

  function handleRollClick() {
    const diceArray: Dice[] = [];
    for (let i = 0; i < gameState.diceAmount; i++) {
      diceArray.push({ id: uuidv4(), diceValue: getRollResult() });
    }
    const combo = checkForCombo(diceArray);

    setDices(diceArray);
    const dicesValue = diceArray.reduce(
      (prev, curr) => prev + curr.diceValue,
      0,
    );
    const res = calculatePoints(dicesValue, combo);
    setIsCooldown(gameState.rollCooldown);

    const rollAnimationDelay = GAME_SETTINGS.rollAnimationDelay;

    setTimeout(() => {
      dispatch(changePoints(res));

      dispatch(
        changeStats({
          ...gameState.stats,
          diceRolls: gameState.stats.diceRolls + 1,
          bestRoll:
            gameState.stats.bestRoll >= res ? gameState.stats.bestRoll : res,
        }),
      );
    }, rollAnimationDelay);
  }

  if (checkWinCondition()) {
    winDialog.current!.open();
  }

  useEffect(() => {
    if (isCooldown > 0) {
      const interval = setInterval(() => {
        setIsCooldown(isCooldown - 50);
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isCooldown]);
  return (
    <>
      <DiceBoard dices={dices} />
      {/* <div className="row"></div> */}

      <div className="row">
        <button
          className="btn roll-btn"
          onClick={handleRollClick}
          disabled={checkRollBtnDisabled()}
        >
          Roll
        </button>
      </div>
      <ResultModal ref={winDialog} />
    </>
  );
}
