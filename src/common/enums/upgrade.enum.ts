export enum Upgrade {
  //multi-level upgrades
  DiceAmount = 'diceAmountUpgrade',
  ReduceCooldown = 'reduceCooldownUpgrade',
  ReduceAutoRollCooldown = 'reduceAutoRollCooldownUpgrade',

  //one time upgrades

  ChipsMultiplierFromTotalRolls = 'chipsMultiplierFromTotalRollsUpgrade',
  ChipsMultiplierFromBestRoll = 'chipsMultiplierFromBestRollUpgrade',
  ChipsMultiplierFromTotalAchievements = 'chipsMultiplierFromTotalAchievementsUpgrade',
  ChipsMultiplierFromTotalPlaytime = 'chipsMultiplierFromTotalPlaytimeUpgrade',
}
