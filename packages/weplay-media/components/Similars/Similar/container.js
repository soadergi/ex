import {
  compose,
  pure,
  withPropsOnChange,
} from 'recompose'

import getArticleImage from 'weplay-core/helpers/getArticleImage'
import { transformUrl } from 'weplay-core/helpers/transformUrl'

const container = compose(
  pure,
  withPropsOnChange([
    'newspaper',
  ], ({
    newspaper,
  }) => ({
    squareImage: getArticleImage(newspaper, 'square'),
    linkUrl: `/news/${transformUrl(newspaper)}`,
  })),
)

export default container
