export enum Upgrade {
  //multi-level upgrades
  DiceAmount = 'diceAmountUpgrade',
  ReduceCooldown = 'reduceCooldownUpgrade',
  ReduceAutoRollCooldown = 'reduceAutoRollCooldownUpgrade',
  PairMultiplier = 'pairMultiplierUpgrade',
  TwoPairsMultiplier = 'twoPairsMultiplierUpgrade',
  ThreeOfAKindMultiplier = 'threeOfAKindMultiplierUpgrade',
  CoinGainMultiplier = 'coinGainMultiplierUpgrade',
  ComboMultiplier = 'comboMultiplierUpgrade',

  //one time upgrades
  ChipsMultiplierFromTotalRolls = 'chipsMultiplierFromTotalRollsUpgrade',
  ChipsMultiplierFromBestRoll = 'chipsMultiplierFromBestRollUpgrade',
  ChipsMultiplierFromTotalAchievements = 'chipsMultiplierFromTotalAchievementsUpgrade',
  ChipsMultiplierFromTotalPlaytime = 'chipsMultiplierFromTotalPlaytimeUpgrade',
  ChipsMultiplierForEachSixValue = 'chipsMultiplierForEachSixValueUpgrade',
  AutoRoll = 'autoRollUnlock',
  CardDraw = 'cardDrawUnlock',
}
