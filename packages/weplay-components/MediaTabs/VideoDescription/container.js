import * as R from 'ramda'
import {
  compose,
  withStateHandlers,
  withPropsOnChange,
  lifecycle,
} from 'recompose'

import { cutTextWithLength } from 'weplay-core/helpers/cutTextWithLength'

const SEO_TEXT_MAX_LENGTH = 100

const container = compose(
  withStateHandlers({
    isSeoTextExpanded: false,
  }, {
    toggleSeoTextViewStatus: ({ isSeoTextExpanded }) => () => ({
      isSeoTextExpanded: !isSeoTextExpanded,
    }),
  }),

  withPropsOnChange([
    'video',
    'isSeoTextExpanded',
  ], ({
    video,
    isSeoTextExpanded,
  }) => {
    const seoText = isSeoTextExpanded
      ? video.seo
      : cutTextWithLength({
        text: R.propOr('', 'seo', video),
        maxLength: SEO_TEXT_MAX_LENGTH,
      })
    const isReadMoreActive = R.length(seoText) < R.length(video.seo)

    return {
      seoText,
      isReadMoreActive,
    }
  }),

  lifecycle({
    componentDidUpdate(prevProps) {
      if (prevProps.video !== this.props.video && this.props.isSeoTextExpanded) {
        this.props.toggleSeoTextViewStatus()
      }
    },
  }),
)

export default container
