import { Upgrade } from '../enums/upgrade.enum.js';

export type UpgradeProperties = {
  id: Upgrade;
  name: string;
  baseCost: number;
  costMultiplier: number;
  value?: number;
  isPercentage?: boolean;
  levels: number;
};
