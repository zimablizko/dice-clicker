import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { GAME_SETTINGS } from '../common/consts/game-settings.const';
import { UPGRADE_VALUES } from '../common/consts/upgrade-values.const';
import { Upgrade } from '../common/enums/upgrade.enum';
import { CalculationResult } from '../common/model/calculation.model';
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
  const [res, setRes] = useState<CalculationResult | undefined>();

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

  const checkWinCondition = () =>
    gameState.points >= GAME_SETTINGS.winCondition;

  function handleRollClick() {
    const diceArray: Dice[] = [];
    const dicesAmount = gameState.upgradeLevels[Upgrade.DiceAmount];
    const cooldown = getCooldown();
    const pointsMultiplier = getUpgradePointsMultiplier();
    for (let i = 0; i < dicesAmount; i++) {
      diceArray.push({ id: uuidv4(), diceValue: getRollResult() });
    }
    const combo = checkForCombo(diceArray);

    setDices(diceArray);
    const dicesValue = diceArray.reduce(
      (prev, curr) => prev + curr.diceValue,
      0,
    );

    const res = calculatePoints(dicesValue, combo, pointsMultiplier);

    setIsCooldown(cooldown);

    const rollAnimationDelay = GAME_SETTINGS.rollAnimationDelay;

    setTimeout(() => {
      dispatch(changePoints(res.result));
      setRes(res);
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
      <div className="row">
        <div className="combo">
          <label>
            {res && res.comboProperties.name && <>{res.comboProperties.name}</>}
          </label>
        </div>
        <div className="calculation">
          <label>
            {res && res.baseValue !== 0 && (
              <>
                {res.baseValue === res.result && res.result}
                {res.baseValue !== res.result && (
                  <>
                    {res.baseValue}
                    {res.upgradeMultiplier > 1 && ` x ${res.upgradeMultiplier}`}
                    {res.comboProperties.multiplier > 1 &&
                      ` x ${res.comboProperties.multiplier}`}
                    {` = ${res.result}`}
                  </>
                )}
              </>
            )}
          </label>
        </div>
      </div>

      <DiceBoard dices={dices} />
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
