import { Combo } from '../enums/combo.enum.js';
import { Dice } from '../model/dice.model.js';

export const checkForCombo = (dices: Dice[]): Combo => {
  let result = Combo.None;

  const diceValues = dices.map((dice) => dice.diceValue);
  result = checkForSameValues(diceValues);
  return result;
};

const checkForSameValues = (diceValues: number[]): Combo => {
  const resultList: Combo[] = [];
  let result = Combo.None;

  const uniqueValues = [...new Set(diceValues)].sort();
  let maxLength = 0;
  // let maxValue = 1;

  for (const uniqueValue of uniqueValues) {
    const count = diceValues.filter((v) => v === uniqueValue).length;
    if (count > 1) {
      if (maxLength === 2 && count === 2) {
        resultList.push(Combo.TwoPairs);
      }
      if ((maxLength === 2 && count > 2) || (maxLength > 2 && count === 2)) {
        resultList.push(Combo.FullHouse);
      }
      if (count >= maxLength) {
        maxLength = count;
        // maxValue = uniqueValue;
      }
    }
  }

  if (maxLength < 2) {
    return result;
  }
  switch (maxLength) {
    case 2:
      resultList.push(Combo.Pair);
      break;
    case 3:
      resultList.push(Combo.ThreeOfAKind);
      break;
    case 4:
      resultList.push(Combo.FourOfAKind);
      break;
    case 5:
      resultList.push(Combo.FiveOfAKind);
      break;
    case 6:
      resultList.push(Combo.SixOfAKind);
      break;
  }

  result = resultList.sort().at(-1)!;

  return result;
};
