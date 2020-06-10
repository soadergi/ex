import R from 'ramda'
import {
  compose,
  lifecycle,
  withHandlers,
  withStateHandlers,
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
  // TODO: Use debounce instead of timeOut
  withStateHandlers({
    timeoutId: null,
  }, {
    setTimeoutId: () => id => ({ timeoutId: id }),
    clearTimeoutId: ({ timeoutId }) => () => clearTimeout(timeoutId),
  }),
  /* ========================end========================= */

  withStateHandlers(({ viewOptions }) => ({
    searchInputValue: viewOptions.search,
  }), {
    searchInputChange: () => event => ({
      searchInputValue: event.target.value,
    }),
    resetSearchInput: () => () => ({
      searchInputValue: '',
    }),
  }),

  withStateHandlers({
    isFocused: false,
  }, {
    focusHandler: () => () => ({
      isFocused: true,
    }),
    blurHandler: () => () => ({
      isFocused: false,
    }),
  }),

  withHandlers({
    makeSearch: ({
      onChange,
      viewOptions,
    }) => (value) => {
      onChange({
        ...viewOptions,
        search: value,
      })
    },
  }),

  withStateHandlers({
    inputRef: false,
  }, {
    setInputRef: () => inputRef => ({
      inputRef,
    }),
  }),

  withHandlers({
    onSearchSubmit: ({
      makeSearch,
      searchInputValue,
      // TODO: Use debounce instead of timeOut
      clearTimeoutId,
      /* ========================end========================= */
      inputRef,
    }) => (event) => {
      event.preventDefault()
      // TODO: Use debounce instead of timeOut
      clearTimeoutId()
      /* ========================end========================= */
      inputRef.blur()
      makeSearch(searchInputValue)
    },
  }),
  // TODO: Use debounce instead of timeOut
  withHandlers({
    startTimer: ({
      makeSearch,
      setTimeoutId,
      searchInputValue,
      asyncSearchTimeout,
    }) => () => {
      setTimeoutId(
        setTimeout(() => {
          makeSearch(searchInputValue)
        }, asyncSearchTimeout),
      )
    },
  }),

  withHandlers({
    handleClearSearchButton: ({
      viewOptions,
      onChange,
      resetSearchInput,
    }) => () => {
      resetSearchInput()
      onChange({
        ...viewOptions,
        search: '',
      })
    },
  }),

  withPropsOnChange([
    'searchInputValue',
  ], ({
    searchInputValue,
    clearTimeoutId,
    startTimer,
  }) => {
    clearTimeoutId()
    if (R.trim(searchInputValue).length > 2) startTimer()
  }),

  lifecycle({
    componentWillUnmount() {
      this.props.clearTimeoutId()
    },
  }),
  /* ========================end========================= */
)

export default container
