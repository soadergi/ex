import * as R from 'ramda'
import {
  compose,
  lifecycle,
  withPropsOnChange,
  withStateHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    isMobileWidth: isMobileWidthSelector,
  }), {
    // actionCreators
  }),
  withStateHandlers({
    isCheckboxChecked: false,
  }, {
    toggleCheckbox: ({ isCheckboxChecked }) => () => ({
      isCheckboxChecked: !isCheckboxChecked,
    }),
  }),
  withPropsOnChange([
    'dirty',
    'errors',
    'isCheckboxChecked',
    'isCheckboxVisible',
  ], ({
    dirty,
    errors,
    isCheckboxChecked,
    isCheckboxVisible,
  }) => ({
    isButtonEnabled: R.isEmpty(errors) && dirty && (!isCheckboxVisible || isCheckboxChecked),
  })),
  withPropsOnChange([
    'errors',
    'serverErrorMessage',
  ], ({
    errors,
    serverErrorMessage,
  }) => ({
    errors: serverErrorMessage ? { email: [serverErrorMessage] } : errors,
  })),
  lifecycle({
    componentDidMount() {
      this.props.resetForm()
    },
  }),
)

export default container
