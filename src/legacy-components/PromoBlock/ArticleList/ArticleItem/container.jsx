import {
  compose,
  pure,
  withPropsOnChange,
} from 'recompose'
import { transformUrl } from 'weplay-core/helpers/transformUrl'

const container = compose(
  pure,
  withPropsOnChange([
    'newspaper',
  ], ({
    newsPaper,
  }) => ({
    newsPaperWriter: newsPaper.author || newsPaper.columnist,
    newsLink: `/news/${transformUrl(newsPaper)}`,
  })),
)

export default container
