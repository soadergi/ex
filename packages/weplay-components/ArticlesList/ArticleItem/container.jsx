import {
  compose,
  pure,
  withPropsOnChange,
} from 'recompose'
import { getShortArticleTitle } from 'weplay-core/helpers/getShortArticleTitle'

const container = compose(
  pure,

  withPropsOnChange([
    'article',
  ], ({ article }) => ({
    title: getShortArticleTitle(article.title),
  })),
)

export default container
