import {
  compose,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { getShortArticleTitle } from 'weplay-core/helpers/getShortArticleTitle'
import getArticleImage from 'weplay-core/helpers/getArticleImage'

// TODO: @front please rewrite it with hooks
const container = compose(
  connect(createStructuredSelector({
    // selectors
  }), {
    // actionCreators
  }),

  withPropsOnChange([
    'newspaper',
  ], ({ newspaper }) => ({
    title: getShortArticleTitle(newspaper.title),
    previewImage: getArticleImage(newspaper, 'square'),
  })),
)

export default container
