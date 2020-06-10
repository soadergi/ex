import { cutTextWithLength } from './cutTextWithLength'

const MAX_LENGTH = 70

export const getShortArticleTitle = title => cutTextWithLength({
  text: title,
  maxLength: MAX_LENGTH,
})
