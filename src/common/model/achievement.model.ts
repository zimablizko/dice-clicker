import { Achievement, AchievementGroup } from '../enums/achievement.enum';

export type AchievementProperties = {
  id: Achievement;
  description: string;
  name: string;
  group: AchievementGroup;
  numCondition?: number;
};
