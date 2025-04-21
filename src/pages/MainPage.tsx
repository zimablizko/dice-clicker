import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Upgrade } from '../common/enums/upgrade.enum.js';
import { CalculationResult } from '../common/model/calculation.model.js';
import { Dice } from '../common/model/dice.model.js';
import { formatNumber } from '../common/utils/formatter.js';
import CardCollection from '../components/cards/CardCollection.js';
import CardDrawModal from '../components/cards/CardDrawModal.js';
import ChipsBlock from '../components/main/ChipsBlock.js';
import DiceBoard from '../components/main/DiceBoard.js';
import RollButton from '../components/main/RollButton.js';
import { changeChips } from '../store/game-state.js';
import { GameState } from '../store/model/game-state.model.js';

export default function MainPage() {
  const dispatch = useDispatch();
  const gameState = useSelector(
    (state: { gamestate: GameState }) => state.gamestate,
  );

  const cardsUnlocked = useSelector(
    (state: { gamestate: GameState }) => state.gamestate.upgradeLevels[Upgrade.CardDraw] > 0,
  );

  const [res, setRes] = useState<CalculationResult | undefined>();
  const [dices, setDices] = useState<Dice[]>([]);
  const cardDrawModalRef = useRef<{ open: () => void }>(null);

  const handleDrawCardClick = () => {
    if (gameState.resources.chips >= gameState.cardDrawPrice) {
      dispatch(changeChips(-gameState.cardDrawPrice));
      cardDrawModalRef.current?.open();
    }
  };

  return (
    <>
      <ChipsBlock result={res} />
      <DiceBoard dices={dices} />
      <RollButton onRollResult={setRes} onDicesChange={setDices} />
      
      
      
      {cardsUnlocked && (
        <>
        <div className="row">
        <button 
          className="btn card-draw-btn" 
          onClick={handleDrawCardClick}
          disabled={gameState.resources.chips < gameState.cardDrawPrice}
        >
          Draw Card ({formatNumber(gameState.cardDrawPrice)} chips)
        </button>
      </div>
        <CardCollection cards={gameState.cards} />
        <CardDrawModal 
        ref={cardDrawModalRef} 
      />
        </>
      )}
      
      
      
    </>
  );
}
