type DiceProps = {
  dice: { diceValue: number };
};

function DiceElement({ dice }: DiceProps) {
  const diceClass = `dice n-${dice.diceValue}`;
  return <div className={diceClass}></div>;
}

export default DiceElement;
