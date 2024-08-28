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
    id: Achievement.Points100,
    description: 'Get 100 points',
    name: '100 points',
    group: AchievementGroup.Points,
    numCondition: 100,
  },
  {
    id: Achievement.Points1000,
    description: 'Get 1000 points',
    name: '1000 points',
    group: AchievementGroup.Points,
    numCondition: 1000,
  },
  {
    id: Achievement.Points10000,
    description: 'Get 10000 points',
    name: '10000 points',
    group: AchievementGroup.Points,
    numCondition: 10000,
  },
  {
    id: Achievement.Points100000,
    description: 'Get 100000 points',
    name: '100000 points',
    group: AchievementGroup.Points,
    numCondition: 100000,
  },
];
