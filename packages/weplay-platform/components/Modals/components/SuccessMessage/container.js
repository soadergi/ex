import { connect } from 'react-redux'
import {
  compose,
} from 'recompose'
import { createStructuredSelector } from 'reselect'
import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

const container = compose(
  withLocale, // props: { locale, t }
  connect(createStructuredSelector({
    // selectors
  }), {
    // actionCreators
  }),
)

export default container
