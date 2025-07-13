type DiceProps = {
  dice: { diceValue: number };
};

function DiceElement({ dice }: DiceProps) {
  return (
    <div
      className="dice"
      style={{
        backgroundImage: `url('dice-clicker/icons/dice-${dice.diceValue}.svg')`,
      }}
    ></div>
  );
}

export default DiceElement;
