import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CalculationResult } from '../common/model/calculation.model.js';
import { Dice } from '../common/model/dice.model.js';
import { formatNumber } from '../common/utils/formatter.js';
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
      
      <div className="row">
        <button 
          className="btn card-draw-btn" 
          onClick={handleDrawCardClick}
          disabled={gameState.resources.chips < gameState.cardDrawPrice}
        >
          Draw Card ({formatNumber(gameState.cardDrawPrice)} chips)
        </button>
      </div>
      
      {gameState.cards.length > 0 && (
        <div className="row">
          <h3>Your Cards ({gameState.cards.length})</h3>
          <div className="cards-collection">
            {gameState.cards.slice(0, 3).map((card) => (
              <div key={card.id} className={`card-small ${card.rarity}`}>
                <div className="card-name">{card.name}</div>
                <div className="card-effect">{card.effect.description}</div>
              </div>
            ))}
            {gameState.cards.length > 3 && (
              <div className="card-small more-cards">
                +{gameState.cards.length - 3} more cards
              </div>
            )}
          </div>
        </div>
      )}
      
      <CardDrawModal 
        ref={cardDrawModalRef} 
      />
    </>
  );
}
