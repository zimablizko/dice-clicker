import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { GAME_SETTINGS } from '../common/consts/game-settings.const.js';
import { CalculationResult } from '../common/model/calculation.model.js';
import { Dice } from '../common/model/dice.model.js';
import ChipsBlock from '../components/main/ChipsBlock.js';
import DiceBoard from '../components/main/DiceBoard.js';
import ResultModal from '../components/main/ResultModal.js';
import RollButton from '../components/main/RollButton.js';
import { GameState } from '../store/model/game-state.model.js';

export default function MainPage() {
  const gameState = useSelector(
    (state: { gamestate: GameState }) => state.gamestate,
  );
  const [res, setRes] = useState<CalculationResult | undefined>();
  const [dices, setDices] = useState<Dice[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const winDialog = useRef<any>(null);

  const checkWinCondition = () => gameState.chips >= GAME_SETTINGS.winCondition;

  if (checkWinCondition()) {
    winDialog.current!.open();
  }

  return (
    <>
      <ChipsBlock result={res} />
      <DiceBoard dices={dices} />
      <RollButton onRollResult={setRes} onDicesChange={setDices} />
      <ResultModal ref={winDialog} />
    </>
  );
}
