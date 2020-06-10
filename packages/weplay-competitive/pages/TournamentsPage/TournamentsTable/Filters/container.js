import {
  compose,
  withHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import withAnalytics from 'weplay-core/HOCs/withAnalytics'
import { capitalizeFirstLetter } from 'weplay-core/helpers/capitalizeFirstLetter'

import { gameModesSelectors } from 'weplay-competitive/reduxs/gameModes'
import { AT__TOURNAMENTS_LIST_FILTER } from 'weplay-competitive/analytics/amplitude'

const container = compose(
  connect(createStructuredSelector({
    gameModes: gameModesSelectors.allRecordsSelector,
    // selectors
  }), {
    // actionCreators
  }),
  withAnalytics,
  withLocale,
  withHandlers({
    sendAmplitudeEvent: ({
      logAmplitude,
      filterConfigs,
    }) => (fieldValue, fieldLabel) => {
      const currentFilter = filterConfigs.find(filter => filter.fieldLabel === fieldLabel)
      const currentOption = currentFilter.options.find(option => option.value === fieldValue)
      if (fieldValue !== 'any') {
        const eventProperties = {}
        switch (fieldLabel) {
          case 'gameMode':
            eventProperties.Mode = currentOption.label
            break
          case 'bracket':
            eventProperties.Bracket = currentOption.label
            break
          case 'emptySlots':
            eventProperties.Slots = currentOption.label
            break
          case 'status':
            eventProperties.Status = capitalizeFirstLetter(fieldValue)
            break
          default:
        }
        logAmplitude(AT__TOURNAMENTS_LIST_FILTER, eventProperties)
      }
    },
  }),
)

export default container
