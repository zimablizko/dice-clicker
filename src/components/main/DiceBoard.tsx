import { Dice } from 'common/model/dice.model.js';
import DiceElement from './DiceElement.js';

type DiceBoardProps = {
  dices: Dice[];
};

function DiceBoard({ dices }: DiceBoardProps) {
  return (
    <div className="row dice-board">
      {dices.map((dice) => {
        return <DiceElement key={dice.id} dice={dice} />;
      })}
    </div>
  );
}

export default DiceBoard;
