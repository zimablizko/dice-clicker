import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { GAME_SETTINGS } from '../../common/consts/game-settings.const.js';
import { ShopUpgrade } from '../../common/enums/shop-upgrade.enum.js';
import { CalculationResult } from '../../common/model/calculation.model.js';
import { Dice } from '../../common/model/dice.model.js';
import { calculateChips } from '../../common/utils/chip-calculator.js';
import { checkForCombo } from '../../common/utils/combo-helper.js';
import {
  getAutoRollCooldown,
  getCooldown,
} from '../../common/utils/cooldown-helper.js';
import { getDiceAmount } from '../../common/utils/dice-helper.js';
import { changeChips, changeStats } from '../../store/game-state.js';
import { GameState } from '../../store/model/game-state.model.js';

type RollButtonProps = {
  onRollResult: (result: CalculationResult | undefined) => void;
  onDicesChange: (dices: Dice[]) => void;
};

const rollAnimationDelay = GAME_SETTINGS.rollAnimationDelay;

export default function RollButton({
  onRollResult,
  onDicesChange,
}: RollButtonProps) {
  const dispatch = useDispatch();
  const gameState = useSelector(
    (state: { gamestate: GameState }) => state.gamestate,
  );

  const autoRollUnlocked =
    gameState.shopUpgradeLevels[ShopUpgrade.AutoRoll] > 0;

  const [isCooldown, setIsCooldown] = useState(0);
  const [cooldownPercent, setCooldownPercent] = useState(0);

  const [isAutoRollCooldown, setIsAutoRollCooldown] = useState(0);
  const [autoRollCooldownPercent, setAutoRollCooldownPercent] = useState(0);
  const [autoRollEnabled, setAutoRollEnabled] = useState(true);

  const getRollResult = () => Math.floor(Math.random() * 6) + 1;

  const checkRollBtnDisabled = () => isCooldown > 0;
  function handleRollClick() {
    onDicesChange([]);
    onRollResult(undefined);
    const diceArray: Dice[] = [];
    const dicesAmount = getDiceAmount(gameState);
    console.log(`Rolling ${dicesAmount} dices...`);

    const cooldown = getCooldown(gameState);

    for (let i = 0; i < dicesAmount; i++) {
      diceArray.push({ id: uuidv4(), diceValue: getRollResult() });
    }
    const combo = checkForCombo(diceArray);
    onDicesChange(diceArray);
    const dicesValue = diceArray.reduce(
      (prev, curr) => prev + curr.diceValue,
      0,
    );

    const res = calculateChips(dicesValue, combo, gameState);

    setIsCooldown(cooldown);

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

  function handleAutoRollClick() {
    setAutoRollEnabled(!autoRollEnabled);
  }

  useEffect(() => {
    if (isCooldown > 0) {
      const cooldown = getCooldown(gameState);
      const interval = setInterval(() => {
        const newValue = isCooldown - 50 < 0 ? 0 : isCooldown - 50;
        setIsCooldown(newValue);
        setCooldownPercent(
          Math.ceil(((cooldown - isCooldown) / cooldown) * 100),
        );
      }, 50);

      return () => clearInterval(interval);
    } else {
      setCooldownPercent(100);
    }
  }, [isCooldown]);

  useEffect(() => {
    if (!autoRollUnlocked) return;
    const cooldown = getAutoRollCooldown(gameState);
    if (isAutoRollCooldown > 0) {
      const interval = setInterval(() => {
        setIsAutoRollCooldown(isAutoRollCooldown - 50);
        setAutoRollCooldownPercent(
          Math.ceil(((cooldown - isAutoRollCooldown) / cooldown) * 100),
        );
      }, 50);

      return () => clearInterval(interval);
    } else {
      if (autoRollEnabled && !isCooldown) {
        handleRollClick();
        setIsAutoRollCooldown(cooldown);
      }
    }
  }, [autoRollUnlocked, autoRollEnabled, isCooldown, isAutoRollCooldown]);

  return (
    <>
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
      {autoRollUnlocked && (
        <div className="row">
          <button
            className={`btn auto-roll-btn ${autoRollEnabled ? '' : 'disabled'}`}
            onClick={handleAutoRollClick}
          >
            Auto Roll {autoRollEnabled ? 'ON' : 'OFF'}
          </button>
          <progress
            className="roll-progress-bar"
            id="rollCooldownBar"
            value={autoRollCooldownPercent}
            max="100"
          />
        </div>
      )}
    </>
  );
}
