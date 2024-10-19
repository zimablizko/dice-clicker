import { Achievement, AchievementGroup } from '../enums/achievement.enum.js';
import { AchievementProperties } from '../model/achievement.model.js';

export const ACHIEVEMENT_VALUES: Array<AchievementProperties> = [
  {
    id: Achievement.Roll1,
    description: 'Roll 1 time',
    name: 'So it begins...',
    group: AchievementGroup.Rolls,
    numCondition: 1,
  },
  {
    id: Achievement.Roll10,
    description: 'Roll 10 times',
    name: 'Roller',
    group: AchievementGroup.Rolls,
    numCondition: 10,
  },
  {
    id: Achievement.Roll100,
    description: 'Roll 100 times',
    name: 'Rollest',
    group: AchievementGroup.Rolls,
    numCondition: 100,
  },
  {
    id: Achievement.Roll1000,
    description: 'Roll 1000 times',
    name: 'Rollercoaster',
    group: AchievementGroup.Rolls,
    numCondition: 1000,
  },

  {
    id: Achievement.Chips100,
    description: 'Get 100 chips (Reward: unlock Payout)',
    name: 'Novice',
    group: AchievementGroup.Chips,
    numCondition: 100,
  },
  {
    id: Achievement.Chips1000,
    description: 'Get 1000 chips',
    name: 'Amateur',
    group: AchievementGroup.Chips,
    numCondition: 1000,
  },
  {
    id: Achievement.Chips10000,
    description: 'Get 10000 chips',
    name: 'Middleman',
    group: AchievementGroup.Chips,
    numCondition: 10000,
  },
  {
    id: Achievement.Chips100000,
    description: 'Get 100000 chips',
    name: 'Upperclassman',
    group: AchievementGroup.Chips,
    numCondition: 100000,
  },

  {
    id: Achievement.Payout1,
    description: 'Get your first payout',
    name: 'Is this real life?',
    group: AchievementGroup.Payouts,
    numCondition: 1,
  },
  {
    id: Achievement.Payout10,
    description: 'Get 10 payouts',
    name: 'Is this just fantasy?',
    group: AchievementGroup.Payouts,
    numCondition: 10,
  },
  {
    id: Achievement.Payout100,
    description: 'Get 100 payouts',
    name: 'Caught in a landslide',
    group: AchievementGroup.Payouts,
    numCondition: 100,
  },
  {
    id: Achievement.Payout1000,
    description: 'Get 1000 payouts',
    name: 'No escape from reality',
    group: AchievementGroup.Payouts,
    numCondition: 1000,
  },
];
