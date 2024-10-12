import { ResourceType } from '../enums/resource-type.enum.js';
import { ShopUpgrade } from '../enums/shop-upgrade.enum.js';
import { Upgrade } from '../enums/upgrade.enum.js';

export type UpgradeProperties = {
  id: Upgrade | ShopUpgrade;
  name: string;
  baseCost: number;
  costMultiplier: number;
  value?: number;
  levels: number;
  resourceType: ResourceType;
};
