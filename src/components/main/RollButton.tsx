import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { GAME_SETTINGS } from '../../common/consts/game-settings.const.js';
import { UPGRADE_VALUES } from '../../common/consts/upgrade-values.const.js';
import { Upgrade } from '../../common/enums/upgrade.enum.js';
import { CalculationResult } from '../../common/model/calculation.model.js';
import { Dice } from '../../common/model/dice.model.js';
import { calculateChips } from '../../common/utils/chip-calculator.js';
import { checkForCombo } from '../../common/utils/combo-helper.js';
import { changeChips, changeStats } from '../../store/game-state.js';
import { GameState } from '../../store/model/game-state.model.js';

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
      //TODO: remove baseRollCooldown from GAME_SETTINGS?
      GAME_SETTINGS.baseRollCooldown /
        UPGRADE_VALUES[Upgrade.ReduceCooldown].value! **
          gameState.upgradeLevels[Upgrade.ReduceCooldown],
    );
  const getUpgradeChipsMultiplier = () =>
    1 +
    UPGRADE_VALUES[Upgrade.SmallChipsMultiplier].value! *
      gameState.upgradeLevels[Upgrade.SmallChipsMultiplier] +
    UPGRADE_VALUES[Upgrade.BigChipsMultiplier].value! *
      gameState.upgradeLevels[Upgrade.BigChipsMultiplier] +
    UPGRADE_VALUES[Upgrade.MediumChipsMultiplier].value! *
      gameState.upgradeLevels[Upgrade.MediumChipsMultiplier];

  const checkRollBtnDisabled = () => isCooldown > 0;
  function handleRollClick() {
    onDicesChange([]);
    onRollResult(undefined);
    const diceArray: Dice[] = [];
    const dicesAmount = gameState.upgradeLevels[Upgrade.DiceAmount];
    const cooldown = getCooldown();
    const chipsMultiplier = getUpgradeChipsMultiplier();
    for (let i = 0; i < dicesAmount; i++) {
      diceArray.push({ id: uuidv4(), diceValue: getRollResult() });
    }
    const combo = checkForCombo(diceArray);
    onDicesChange(diceArray);
    const dicesValue = diceArray.reduce(
      (prev, curr) => prev + curr.diceValue,
      0,
    );

    const res = calculateChips(dicesValue, combo, chipsMultiplier);

    setIsCooldown(cooldown);

    const rollAnimationDelay = GAME_SETTINGS.rollAnimationDelay;

    setTimeout(() => {
      dispatch(changeChips(res.result));
      onRollResult(res);
      dispatch(
        changeStats({
          ...gameState.stats,
          diceRolls: gameState.stats.diceRolls + 1,
          bestRoll:
            gameState.stats.bestRoll >= res.result
              ? gameState.stats.bestRoll
              : res.result,
          maxChips:
            gameState.stats.maxChips >= gameState.resources.chips
              ? gameState.stats.maxChips
              : gameState.resources.chips,
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
