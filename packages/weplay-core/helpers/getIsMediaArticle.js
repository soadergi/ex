import { ARTICLE_TYPES } from 'weplay-core/consts/articleTypes'

const CHECKED_ARTICLE_TYPES = [
  ARTICLE_TYPES.VIDEO,
  ARTICLE_TYPES.AUDIO,
  ARTICLE_TYPES.INTERVIEW,
]

export const getIsMediaArticle = newspaper => (
  CHECKED_ARTICLE_TYPES.includes(newspaper?.articleType) && Boolean(newspaper?.mediaIframeLink)
)
