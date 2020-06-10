import * as R from 'ramda'
import {
  compose,
  withPropsOnChange,
  withStateHandlers,
  withHandlers,
  lifecycle,
} from 'recompose'

const container = compose(
  withStateHandlers({
    isPasswordVisible: false,
  }, {
    togglePasswordVisibility: ({ isPasswordVisible }) => () => ({
      isPasswordVisible: !isPasswordVisible,
    }),
  }),
  withPropsOnChange([
    'isPasswordVisible',
  ], ({
    isPasswordVisible,
  }) => ({
    fieldType: isPasswordVisible ? 'text' : 'password',
  })),
  withHandlers({
    handleBlur: props => (event) => {
      props.setFieldTouched(event.target.name, Boolean(event.target.value))
    },
  }),
  lifecycle({
    componentDidUpdate() {
      if (this.props.isTouched && this.props.logAnalytics) {
        if (!R.isNil(this.props.errors)) {
          this.props.logFormAnalytics({
            timingVar: 'fail',
            timingLabel: 'unsuccessful',
            eventContent: 'nickname_password',
            eventContext: 'password',
            errorCode: 'invalid password',
          })
        } else {
          this.props.logFormAnalytics({
            timingVar: 'success',
            timingLabel: 'successful',
            eventContent: 'nickname_password',
            eventContext: 'password',
          })
        }
      }
    },
  }),
)

export default container
