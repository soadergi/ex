import {
  compose,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import withLocale from 'weplay-singleton/LocaleProvider/withLocale'
import { userInitialValuesSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'

const container = compose(
  withLocale, // props: { locale, t }
  connect(createStructuredSelector({
    // selectors
    userInitialValues: userInitialValuesSelector,
  }), {
    // actionCreators
  }),
)

export default container
