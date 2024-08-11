export type GameState = {
  points: number;
  diceAmount: number;
  rollCooldown: number;
  upgradeCost: number;
  stats: GameStats;
  achievements: Record<number, boolean>;
};

export interface GameStats {
  diceRolls: number;
  bestRoll: number;
}

export type StateAction<T> = {
  type: string;
  payload: T;
};
