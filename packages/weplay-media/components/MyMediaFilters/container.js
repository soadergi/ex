import * as R from 'ramda'
import {
  compose,
  defaultProps,
  withHandlers,
  withProps,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
  }), {
    // actionCreators
  }),

  defaultProps({
    createAnalyticsWithAction: R.always,
    openMyMediaClearHistoryPopup: R.always,
  }),
  withHandlers({
    handleDropdownChange: ({
      onChange,
      viewOptions,
      createAnalyticsWithAction,
    }) => (value) => {
      onChange({
        ...viewOptions,
        sortType: value,
      })
      const logSortTypeChange = createAnalyticsWithAction('Sort By')
      logSortTypeChange(value)
    },
    handleToggleDirection: ({
      onChange,
      viewOptions,
    }) => () => {
      onChange({
        ...viewOptions,
        sortDesc: !viewOptions.sortDesc,
      })
    },
    handleClearButtonClick: ({
      openClearArticlesPopup,
      createAnalyticsWithAction,
    }) => () => {
      openClearArticlesPopup()
      const logClearButtonClick = createAnalyticsWithAction('Clear history')
      logClearButtonClick()
    },
  }),

  withProps(({
    i18nTexts,
    dropdownOptions,
  }) => ({
    dropdownOptions: R.pipe(
      R.mapObjIndexed((sortValue, keyName) => ({
        label: R.path(['myMedia', 'sorting', 'options', R.toLower(keyName)], i18nTexts),
        value: sortValue,
      })),
      R.values,
    )(dropdownOptions),
  })),

  withPropsOnChange([
    'viewOptions',
  ], ({
    viewOptions,
  }) => ({
    isSearchFilterActive: R.complement(R.isEmpty)(viewOptions.search),
  })),
)

export default container
