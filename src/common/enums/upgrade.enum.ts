export enum Upgrade {
  //multi-level upgrades
  DiceAmount = 'diceAmountUpgrade',
  ReduceCooldown = 'reduceCooldownUpgrade',
  ReduceAutoRollCooldown = 'reduceAutoRollCooldownUpgrade',
  PairMultiplier = 'pairMultiplierUpgrade',
  TwoPairsMultiplier = 'twoPairsMultiplierUpgrade',
  ThreeOfAKindMultiplier = 'threeOfAKindMultiplierUpgrade',
  CoinGainMultiplier = 'coinGainMultiplierUpgrade',

  //one time upgrades
  ChipsMultiplierFromTotalRolls = 'chipsMultiplierFromTotalRollsUpgrade',
  ChipsMultiplierFromBestRoll = 'chipsMultiplierFromBestRollUpgrade',
  ChipsMultiplierFromTotalAchievements = 'chipsMultiplierFromTotalAchievementsUpgrade',
  ChipsMultiplierFromTotalPlaytime = 'chipsMultiplierFromTotalPlaytimeUpgrade',
  AutoRoll = 'autoRollUnlock',
  CardDraw = 'cardDrawUnlock',
}
