import { useState } from 'react';
import { CalculationResult } from '../common/model/calculation.model.js';
import { Dice } from '../common/model/dice.model.js';
import ChipsBlock from '../components/main/ChipsBlock.js';
import DiceBoard from '../components/main/DiceBoard.js';
import RollButton from '../components/main/RollButton.js';

export default function MainPage() {
  const [res, setRes] = useState<CalculationResult | undefined>();
  const [dices, setDices] = useState<Dice[]>([]);

  return (
    <>
      <ChipsBlock result={res} />
      <DiceBoard dices={dices} />
      <RollButton onRollResult={setRes} onDicesChange={setDices} />
    </>
  );
}
