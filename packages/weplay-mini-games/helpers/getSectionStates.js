import { GAME_SECTION_PATHS } from 'weplay-core/routes/miniGames'

export const getSectionStates = ({
  currentSection,
  paths,
}) => ({
  isGamePath: !currentSection,
  isGlobalLadderPath: (currentSection === GAME_SECTION_PATHS.GLOBAL_LADDER) && Boolean(paths.globalLadderPath),
  isDailyLadderPath: (currentSection === GAME_SECTION_PATHS.DAILY_LADDER) && Boolean(paths.dailyLadderPath),
  isPrizesPath: (currentSection === GAME_SECTION_PATHS.PRIZES) && Boolean(paths.prizesPath),
})
