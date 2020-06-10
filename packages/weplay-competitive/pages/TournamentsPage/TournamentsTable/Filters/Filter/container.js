import queryString from 'query-string'
import { createStructuredSelector } from 'reselect'
import {
  compose,
  withHandlers,
} from 'recompose'
import { connect } from 'react-redux'

import withRouter from 'weplay-singleton/RouterProvider/withRouter'

import { gameModesSelectors } from 'weplay-competitive/reduxs/gameModes'
import { DEFAULT_QUERY_VALUES } from 'weplay-competitive/pages/TournamentsPage/TournamentsTable/tableConfig'

const container = compose(
  withRouter,
  connect(createStructuredSelector({
    // selectors
    allGameModes: gameModesSelectors.allRecordsSelector,
  }), {
    // actionCreators
  }),
  withHandlers({
    handleChangeInput: ({
      filterConfig,
      history,
      location,
      sendAmplitudeEvent,
    }) => (value) => {
      const { fieldLabel } = filterConfig
      sendAmplitudeEvent(value, fieldLabel)
      const query = queryString.parse(location.search)
      const currentOption = filterConfig.options.find(option => option.value === value)
      if (value !== DEFAULT_QUERY_VALUES.FILTERS) {
        if (query[fieldLabel] !== currentOption.url) {
          query[fieldLabel] = currentOption.url
        }
      } else {
        delete query[fieldLabel]
      }
      if (query['page-offset']) {
        delete query['page-offset']
      }
      history.push({
        search: queryString.stringify(query, { encode: true }),
      })
    },
  }),
)

export default container
