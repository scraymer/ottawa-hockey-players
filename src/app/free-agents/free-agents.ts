export interface IFreeAgent {
  type: FreeAgentType,
  name: String,
  locale: FreeAgentLocaleType,
  position: FreeAgentPositionType,
  availability: String,
  skill_level: FreeAgentSkillLevelType,
  minimum_notice: FreeAgentMinimumNotice,
  email: String,
  phone: String,
  source: FreeAgentSource
}

export interface IFreeAgentError {
  code: number;
  message: string;
}

export type FreeAgentType = 'Spare' | 'Free Agent';

export type FreeAgentLocaleType = 'West' | 'East';

export type FreeAgentPositionType = 'Any' | 'Forward' | 'Defence' | 'Goalie';

export type FreeAgentSkillLevelType = 'High' | 'Medium' | 'Low';

export type FreeAgentMinimumNotice = 'Same Day' | 'One Day';

export type FreeAgentSource = 'CRHL';
