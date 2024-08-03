import { Dice } from 'model/dice.model';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { GAME_SETTINGS } from '../consts/game-settings.const';
import { changeDiceAmount, changePoints, changeStats, changeUpgradeCost } from '../store/game-state';
import { GameState } from '../store/model/game-state.model';
import DiceBoard from './DiceBoard';
import ResultModal from './ResultModal';

export default function Game() {
  const dispatch = useDispatch();
  const gameState = useSelector((state: { gamestate: GameState }) => state.gamestate);
  const winDialog = useRef<any>(null);

  const [dices, setDices] = useState<Dice[]>([]);
  const [isCooldown, setIsCooldown] = useState(0);

  const getRollResult = () => Math.floor(Math.random() * 6) + 1;
  const getUpgradeCost = () => gameState.diceAmount * 10;
  const checkWinCondition = () => gameState.points >= GAME_SETTINGS.winCondition;
  const checkUpgradeBtnDisabled = () => gameState.points < gameState.upgradeCost;
  const checkRollBtnDisabled = () => isCooldown > 0;

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

  function handleRollClick() {
    const diceArray = [];
    for (let i = 0; i < gameState.diceAmount; i++) {
      diceArray.push({ id: uuidv4(), diceValue: getRollResult() });
    }
    setDices(diceArray);
    const res = diceArray.reduce((prev, curr) => prev + curr.diceValue, 0);
    setIsCooldown(gameState.rollCooldown);

    const rollAnimationDelay = GAME_SETTINGS.rollAnimationDelay;

    setTimeout(() => {
      dispatch(changePoints(res));

      dispatch(
        changeStats({
          ...gameState.stats,
          diceRolls: gameState.stats.diceRolls + 1,
          bestRoll: gameState.stats.bestRoll >= res ? gameState.stats.bestRoll : res,
        })
      );
    }, rollAnimationDelay);
  }

  function handleResetClick() {
    dispatch(changePoints(-gameState.points));
    dispatch(changeDiceAmount(-gameState.diceAmount + 1));
    dispatch(changeStats({ diceRolls: 0, bestRoll: 0 }));

    setDices([]);
  }

  function handleUpgradeClick() {
    if (gameState.points >= gameState.upgradeCost) {
      dispatch(changeDiceAmount(1));
      dispatch(changePoints(-gameState.upgradeCost));
      dispatch(dispatch(changeUpgradeCost(getUpgradeCost())));
    }
  }
  return (
    <>
      <div className="game-screen">
        <div className="row">
          <label>🎲 amount: {gameState.diceAmount}</label>
          <button className="btn upgrade-btn" disabled={checkUpgradeBtnDisabled()} onClick={handleUpgradeClick}>
            +1 🎲 (Cost: {gameState.upgradeCost})
          </button>
        </div>
        <div className="row">
          <p className="points">
            Points: {gameState.points}
            <br></br>
            <span className="wincon-label"> ({GAME_SETTINGS.winCondition} points for victory)</span>
          </p>
        </div>

        <DiceBoard dices={dices} />

        <div className="row">
          <button className="btn roll-btn" onClick={handleRollClick} disabled={checkRollBtnDisabled()}>
            Roll
          </button>
          {/* <button className="btn reset-btn" onClick={handleResetClick}>
            Restart
          </button> */}
        </div>
      </div>
      <ResultModal ref={winDialog} stats={gameState.stats} onReset={handleResetClick} />
    </>
  );
}
