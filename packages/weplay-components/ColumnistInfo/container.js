import * as R from 'ramda'
import {
  compose,
  branch,
  renderNothing,
  withPropsOnChange,
  pure,
} from 'recompose'

import { getWriterUrl } from 'weplay-core/helpers/getWriterUrl'
import { getWriterTitle } from 'weplay-core/reduxs/helpers'

const container = compose(
  pure,
  branch(
    ({ columnist }) => R.isNil(columnist) || R.isEmpty(columnist),
    renderNothing,
  ),

  withPropsOnChange([
    'columnist',
  ], ({
    columnist,
  }) => ({
    columnistName: getWriterTitle(columnist),
    columnistLink: `/columnists/${getWriterUrl(getWriterTitle(columnist), columnist.authorId)}`,
    columnistPosition: R.prop('title', columnist),
  })),
)

export default container
