import { GameState } from '../../store/model/game-state.model.js';
import { ResourceType } from '../enums/resource-type.enum.js';
import { ShopUpgrade } from '../enums/shop-upgrade.enum.js';
import { Upgrade } from '../enums/upgrade.enum.js';

export type UpgradeProperties = {
  id: Upgrade | ShopUpgrade;
  name: string;
  baseCost: number;
  costMultiplier: number;
  levels: number;
  resourceType: ResourceType;
  valueFn: (gameState?: GameState) => number;
  conditionsFn?: (gameState: GameState) => boolean;
  descriptionFn?: (gameState: GameState) => string;
  nextValueFn?: (gameState: GameState) => number;
};
