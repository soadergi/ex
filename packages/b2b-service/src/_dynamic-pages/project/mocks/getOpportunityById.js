import { idToTranslationKey } from './idToTranslationKey'

const createOpportunity = t => projects => projects.map(([
  id,
  key,
]) => [
  id,
  {
    opportunity: {
      innerTitle: t(`projectPage.${key}.description.title`),
      innerText: t(`projectPage.${key}.description.text`),
    },
  },
])
export const getOpportunityById = ({
  id,
  t,
}) => idToTranslationKey
  |> Object.entries
  |> createOpportunity(t)
  |> Object.fromEntries
  |> (opportunities => opportunities[id])
