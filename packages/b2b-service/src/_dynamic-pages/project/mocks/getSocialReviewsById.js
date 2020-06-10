import { idToTranslationKey } from './idToTranslationKey'

const SOCIAL_NAMES = [
  'twitch',
  'twitter',
  'reddit',
]

const createSocialReviews = t => projects => projects.map(([id, key]) => [id, SOCIAL_NAMES.map(socialName => ({
  title: t(`projectPage.${key}.socialReviews.${socialName}.title`),
  socialIcon: t(`projectPage.${key}.socialReviews.${socialName}.icon`),
  text: t(`projectPage.${key}.socialReviews.${socialName}.item.0.text`),
  nickname: t(`projectPage.${key}.socialReviews.${socialName}.item.0.nickname`),
  nicknameUrl: t(`projectPage.${key}.socialReviews.${socialName}.item.0.nicknameUrl`),
}))])
export const getSocialReviewsById = ({
  id,
  t,
}) => idToTranslationKey
  |> Object.entries
  |> createSocialReviews(t)
  |> Object.fromEntries
  |> (socialReviews => socialReviews[id])
