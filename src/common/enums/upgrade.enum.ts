export enum Upgrade {
  //multi-level upgrades
  DiceAmount = 'diceAmountUpgrade',
  ReduceCooldown = 'reduceCooldownUpgrade',
  ReduceAutoRollCooldown = 'reduceAutoRollCooldownUpgrade',

  //one time upgrades
  CardDraw = 'cardDrawUnlock',
  SmallChipsMultiplier = 'smallChipsMultiplierUpgrade',
  MediumChipsMultiplier = 'mediumChipsMultiplierUpgrade',
  BigChipsMultiplier = 'bigChipsMultiplierUpgrade',
}
