import { Upgrade } from '../enums/upgrade.enum';

export type UpgradeProperties = {
  id: Upgrade;
  name: string;
  baseCost: number;
  costMultiplier: number;
  value?: number;
  isPercentage?: boolean;
};
