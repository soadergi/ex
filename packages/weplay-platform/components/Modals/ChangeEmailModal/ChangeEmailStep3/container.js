import {
  compose,
  withHandlers,
} from 'recompose'

const container = compose(
  withHandlers({
    declineSaveSubscriptions: props => () => {
      props.declineSaveSubscriptions()
      props.goToStep('changeEmailStep4')
    },
    approveSaveSubscriptions: props => () => {
      props.approveSaveSubscriptions()
      props.goToStep('changeEmailStep4')
    },
  }),
)

export default container
