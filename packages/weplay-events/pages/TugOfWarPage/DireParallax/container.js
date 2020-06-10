import {
  compose, lifecycle, withHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import Parallax from 'parallax-js'

const container = compose(
  connect(createStructuredSelector({
    // selectors
  }), {
    // actionCreators
  }),

  withHandlers(() => {
    let parallaxDomElement
    let parallaxInstance

    return ({
      saveParallaxRef: () => (ref) => {
        parallaxDomElement = ref
      },
      createParallaxInstance: () => () => {
        parallaxInstance = new Parallax(parallaxDomElement)
      },
      destroyParallaxInstance: () => () => parallaxInstance.destroy(),
    })
  }),

  lifecycle({
    componentDidMount() {
      this.props.createParallaxInstance()
    },
    componentWillUnmount() {
      this.props.destroyParallaxInstance()
    },
  }),
)

export default container
