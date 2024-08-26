import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { GAME_SETTINGS } from '../common/consts/game-settings.const.js';
import { UPGRADE_VALUES } from '../common/consts/upgrade-values.const.js';
import { Upgrade } from '../common/enums/upgrade.enum.js';
import { CalculationResult } from '../common/model/calculation.model.js';
import { Dice } from '../common/model/dice.model.js';
import { checkForCombo } from '../common/utils/combo-helper.js';
import { calculatePoints } from '../common/utils/point-calculator.js';
import { changePoints, changeStats } from '../store/game-state.js';
import { GameState } from '../store/model/game-state.model.js';

type RollButtonProps = {
  onRollResult: (result: CalculationResult | undefined) => void;
  onDicesChange: (dices: Dice[]) => void;
};

export default function RollButton({
  onRollResult,
  onDicesChange,
}: RollButtonProps) {
  const dispatch = useDispatch();
  const gameState = useSelector(
    (state: { gamestate: GameState }) => state.gamestate,
  );

  const [isCooldown, setIsCooldown] = useState(0);
  const [cooldownPercent, setCooldownPercent] = useState(0);

  const getRollResult = () => Math.floor(Math.random() * 6) + 1;
  const getCooldown = () =>
    Math.round(
      GAME_SETTINGS.baseRollCooldown /
        UPGRADE_VALUES[Upgrade.ReduceCooldown].value! **
          gameState.upgradeLevels[Upgrade.ReduceCooldown],
    );
  const getUpgradePointsMultiplier = () =>
    UPGRADE_VALUES[Upgrade.PointsMultiplier].value! *
    gameState.upgradeLevels[Upgrade.PointsMultiplier];

  const checkRollBtnDisabled = () => isCooldown > 0;
  function handleRollClick() {
    onDicesChange([]);
    onRollResult(undefined);
    const diceArray: Dice[] = [];
    const dicesAmount = gameState.upgradeLevels[Upgrade.DiceAmount];
    const cooldown = getCooldown();
    const pointsMultiplier = getUpgradePointsMultiplier();
    for (let i = 0; i < dicesAmount; i++) {
      diceArray.push({ id: uuidv4(), diceValue: getRollResult() });
    }
    const combo = checkForCombo(diceArray);
    onDicesChange(diceArray);
    const dicesValue = diceArray.reduce(
      (prev, curr) => prev + curr.diceValue,
      0,
    );

    const res = calculatePoints(dicesValue, combo, pointsMultiplier);

    setIsCooldown(cooldown);

    const rollAnimationDelay = GAME_SETTINGS.rollAnimationDelay;

    setTimeout(() => {
      dispatch(changePoints(res.result));
      onRollResult(res);
      dispatch(
        changeStats({
          ...gameState.stats,
          diceRolls: gameState.stats.diceRolls + 1,
          bestRoll:
            gameState.stats.bestRoll >= res.result
              ? gameState.stats.bestRoll
              : res.result,
        }),
      );
    }, rollAnimationDelay);
  }

  useEffect(() => {
    if (isCooldown > 0) {
      const interval = setInterval(() => {
        setIsCooldown(isCooldown - 50);
        setCooldownPercent(
          Math.ceil(
            ((GAME_SETTINGS.baseRollCooldown - isCooldown) /
              GAME_SETTINGS.baseRollCooldown) *
              100,
          ),
        );
      }, 50);

      return () => clearInterval(interval);
    } else {
      setCooldownPercent(100);
    }
  }, [isCooldown]);

  return (
    <div className="row">
      <button
        className="btn roll-btn"
        onClick={handleRollClick}
        disabled={checkRollBtnDisabled()}
      >
        Roll
      </button>
      <progress
        className="roll-progress-bar"
        id="rollCooldownBar"
        value={cooldownPercent}
        max="100"
      />
    </div>
  );
}
