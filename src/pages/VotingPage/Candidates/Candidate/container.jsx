import { compose } from 'recompose'
import withCurrentLocation from 'weplay-components/withCurrentLocation'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'

const container = compose(
  withCurrentLocation,
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
  }), {
    // actionCreators
  }),
)

export default container
