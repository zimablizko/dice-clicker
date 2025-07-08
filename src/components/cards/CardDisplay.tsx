import { Card } from '../../common/model/card.model.js';

type CardDisplayProps = {
  card: Card;
  isSelected?: boolean;
};

const CardDisplay = ({ card, isSelected = false }: CardDisplayProps) => {
  return (
    <div className={`card ${card.rarity} ${isSelected ? 'selected' : ''}`}>
      <div className="card-name">{card.name}</div>
      <div className="card-rarity">{card.rarity}</div>
      <div className="card-effect">{card.effect.description}</div>
    </div>
  );
};

export default CardDisplay;