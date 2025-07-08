import { GameState } from '../../store/model/game-state.model.js';
import { ResourceType } from '../enums/resource-type.enum.js';
import { Upgrade } from '../enums/upgrade.enum.js';

export type UpgradeProperties = {
  id: Upgrade;
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
