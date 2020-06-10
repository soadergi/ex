import {
  compose, lifecycle, withStateHandlers,
} from 'recompose'

const VISIBILITY_DURATION = 2000

const container = compose(
  withStateHandlers({
    isShown: false,
  }, {
    showTooltip: () => () => ({
      isShown: true,
    }),
    hideTooltip: () => () => ({
      isShown: false,
    }),
  }),

  lifecycle({
    componentDidUpdate() {
      if (this.props.isShown) {
        this.timeoutId = setTimeout(this.props.hideTooltip, VISIBILITY_DURATION)
      }
    },

    componentWillUnmount() {
      clearTimeout(this.timeoutId)
    },
  }),
)

export default container
