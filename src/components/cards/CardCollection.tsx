import { useMemo } from 'react';
import { Card } from '../../common/model/card.model.js';

// Helper interface for grouped cards
export interface GroupedCard {
  card: Card;
  count: number;
}

interface CardCollectionProps {
  cards: Card[];
}

const CardCollection = ({ cards }: CardCollectionProps) => {
  // Group identical cards
  const groupedCards = useMemo(() => {
    const cardMap = new Map<string, GroupedCard>();
    
    cards.forEach(card => {
      // Create a unique key based on the card's name and effect type
      const cardKey = `${card.name}-${card.effect.effectType}-${card.rarity}`;
      
      if (cardMap.has(cardKey)) {
        // Increment count for existing card
        const existingCard = cardMap.get(cardKey)!;
        existingCard.count++;
      } else {
        // Add new card to the map with count 1
        cardMap.set(cardKey, { card, count: 1 });
      }
    });
    
    // Convert the map to an array for rendering
    return Array.from(cardMap.values());
  }, [cards]);

  if (cards.length === 0) {
    return null;
  }

  return (
    <div className="row">
      <h3>Your Cards ({cards.length})</h3>
      <div className="cards-collection">
        {groupedCards.slice(0, 9).map((groupedCard) => (
          <div key={groupedCard.card.id} className={`card-small ${groupedCard.card.rarity}`}>
            {groupedCard.count > 1 && (
              <span className="card-count-badge">x{groupedCard.count}</span>
            )}
            <div className="card-name">
              {groupedCard.card.name}
            </div>
            <div className="card-effect">{groupedCard.card.effect.description}</div>
          </div>
        ))}
        {groupedCards.length > 9 && (
          <div className="card-small more-cards">
            +{groupedCards.length - 9} more card types
          </div>
        )}
      </div>
    </div>
  );
};

export default CardCollection;