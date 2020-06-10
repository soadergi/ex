import {
  compose,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

const container = compose(
  connect(createStructuredSelector({
    // selectors
  }), {
    // actionCreators
  }),
  withLocale,
  withPropsOnChange([
    'locale',
  ], ({
    locale,
  }) => ({
    linkUrlGuard: locale === 'ru'
      ? 'https://weplayhelp.zendesk.com/hc/ru/articles/360003166098-%D0%9F%D1%80%D0%B0%D0%B9%D0%BC-%D0%B0%D0%BA%D0%BA%D0%B0%D1%83%D0%BD%D1%82-CS-GO' // eslint-disable-line max-len
      : 'https://weplayhelp.zendesk.com/hc/en-us/articles/360003166098-Prime-account-CS-GO',
  })),
)

export default container
