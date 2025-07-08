import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { CARD_VALUES } from '../../common/consts/card-values.const.js';
import { CardEffectType } from '../../common/enums/card-effect.enum.js';
import { CardRarity } from '../../common/enums/card-rarity.enum.js';
import { Card } from '../../common/model/card.model.js';
import { applyInstantEffect } from '../../common/utils/card-helper.js';
import { addCard, increaseCardDrawPrice } from '../../store/game-state.js';
import { GameState } from '../../store/model/game-state.model.js';
import CardDisplay from './CardDisplay.js';


// Helper function to get weighted random rarity
const getRandomRarity = () => {
  const rarities = [
    { rarity: CardRarity.Common, weight: 60 },
    { rarity: CardRarity.Uncommon, weight: 25 },
    { rarity: CardRarity.Rare, weight: 10 },
    { rarity: CardRarity.Epic, weight: 4 },
    { rarity: CardRarity.Legendary, weight: 1 }
  ];
  
  const totalWeight = rarities.reduce((sum, item) => sum + item.weight, 0);
  const random = Math.random() * totalWeight;
  
  let weightSum = 0;
  for (const item of rarities) {
    weightSum += item.weight;
    if (random <= weightSum) {
      return item.rarity;
    }
  }
  
  return CardRarity.Common; // Fallback
};

// Get random cards based on rarity
const getRandomCards = (count: number): Card[] => {
  const result: Card[] = [];
  
  for (let i = 0; i < count; i++) {
    const rarity = getRandomRarity();
    const cardsOfRarity = CARD_VALUES.filter(card => card.rarity === rarity);
    
    if (cardsOfRarity.length > 0) {
      const randomIndex = Math.floor(Math.random() * cardsOfRarity.length);
      // Create a new instance of the card with a unique ID
      const selectedCard = { 
        ...cardsOfRarity[randomIndex], 
        id: uuidv4() 
      };
      result.push(selectedCard);
    } else {
      // Fallback if no cards of selected rarity
      const randomCard = CARD_VALUES[Math.floor(Math.random() * CARD_VALUES.length)];
      result.push({ ...randomCard, id: uuidv4() });
    }
  }
  
  return result;
};

const CardDrawModal = forwardRef((_, ref) => {
  const dialog = useRef<HTMLDialogElement>(null);
  const dispatch = useDispatch();
  const [cards, setCards] = useState<Card[]>([]);
  const gameState = useSelector(
    (state: { gamestate: GameState }) => state.gamestate,
  );

  useImperativeHandle(ref, () => {
    return {
      open() {
        const randomCards = getRandomCards(3);
        setCards(randomCards);

        dialog.current!.showModal();
      },
    };
  });

  const handleCardSelect = (index: number) => {
      const selectedCard = cards[index];
      if (selectedCard.effect.effectType === CardEffectType.InstantCardReroll) {
        const newCards = getRandomCards(3);
        setCards(newCards);
        return;
      }
      dispatch(addCard(selectedCard));
      dispatch(increaseCardDrawPrice());
      applyInstantEffect(gameState,dispatch, selectedCard);
      dialog.current!.close();
  };


  return createPortal(
    <dialog ref={dialog} className="card-draw-modal">
      <h2 className="modal-title">Select a Card</h2>
      <div className="cards-container">
        {cards.map((card, index) => (
          <div 
            key={card.id} 
            onClick={() => handleCardSelect(index)}
          >
            <CardDisplay 
              card={card} 
              
            />
          </div>
        ))}
      </div>
    </dialog>,
    document.getElementById('modal')!
  );
});

export default CardDrawModal;