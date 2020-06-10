import {
  compose,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'
import withMoment from 'weplay-core/HOCs/withMoment'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
  }), {
    // actionCreators
  }),

  withMoment,
  withPropsOnChange(
    [
      'moment',
      'dateFrom',
      'dateTo',
      'descriptionText',
    ], ({
      moment,
      dateFrom,
      dateTo,
      descriptionText,
    }) => {
      const start = moment(dateFrom).format('YYYYMMDDTHHmmSS')
      const end = moment(dateTo).format('YYYYMMDDTHHmmSS')

      return ({
        calendarLink: 'http://www.google.com/calendar/event?action=TEMPLATE&dates='
        + `${start}Z/${end}Z&text=${descriptionText}`,
      })
    },
  ),
)

export default container
