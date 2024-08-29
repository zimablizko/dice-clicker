import { Achievement, AchievementGroup } from '../enums/achievement.enum.js';
import { AchievementProperties } from '../model/achievement.model.js';

export const ACHIEVEMENT_VALUES: Array<AchievementProperties> = [
  {
    id: Achievement.Roll1,
    description: 'Roll 1 time',
    name: 'Roll 1',
    group: AchievementGroup.Rolls,
    numCondition: 1,
  },
  {
    id: Achievement.Roll10,
    description: 'Roll 10 times',
    name: 'Roll 10',
    group: AchievementGroup.Rolls,
    numCondition: 10,
  },
  {
    id: Achievement.Roll100,
    description: 'Roll 100 times',
    name: 'Roll 100',
    group: AchievementGroup.Rolls,
    numCondition: 100,
  },
  {
    id: Achievement.Roll1000,
    description: 'Roll 1000 times',
    name: 'Roll 1000',
    group: AchievementGroup.Rolls,
    numCondition: 1000,
  },

  {
    id: Achievement.Chips100,
    description: 'Get 100 chips (Reward: unlock Payout)',
    name: '100 chips',
    group: AchievementGroup.Chips,
    numCondition: 100,
  },
  {
    id: Achievement.Chips1000,
    description: 'Get 1000 chips',
    name: '1000 chips',
    group: AchievementGroup.Chips,
    numCondition: 1000,
  },
  {
    id: Achievement.Chips10000,
    description: 'Get 10000 chips',
    name: '10000 chips',
    group: AchievementGroup.Chips,
    numCondition: 10000,
  },
  {
    id: Achievement.Chips100000,
    description: 'Get 100000 chips',
    name: '100000 chips',
    group: AchievementGroup.Chips,
    numCondition: 100000,
  },
];
