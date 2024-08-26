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
];
