import React from 'react'
import PropTypes from 'prop-types'

import SimpleSubscribeForm from 'weplay-components/SubscribeForms/SimpleSubscribeForm'

import SubscribeForm from '../SubscribeForms/SubscribeForm'

import container from './container'

const SubscriptionBlock = ({
  // required props
  // container props
  subscriptionBlock,
  // optional props
  Wrapper,
  wrapperClass,
  modifiers,
  isSimple,
  withBackground,
  onSubscribe,
}) => (isSimple ? (
  <SimpleSubscribeForm
    subscriptionBlock={subscriptionBlock}
  />
) : (
  <SubscribeForm
    Wrapper={Wrapper}
    subscriptionBlock={subscriptionBlock}
    wrapperClass={wrapperClass}
    modifiers={modifiers}
    withBackground={withBackground}
    onSubscribe={onSubscribe}
  />
))

SubscriptionBlock.propTypes = {
  // required props
  // container props
  subscriptionBlock: PropTypes.shape({}).isRequired,
  // optional props
  Wrapper: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  wrapperClass: PropTypes.string,
  modifiers: PropTypes.arrayOf(PropTypes.string),
  isSimple: PropTypes.bool,
  withBackground: PropTypes.bool,
  onSubscribe: PropTypes.func,
}

SubscriptionBlock.defaultProps = {
  // optional props
  Wrapper: 'div',
  wrapperClass: '',
  modifiers: [],
  isSimple: false,
  withBackground: true,
  onSubscribe: () => {},
}

export default container(SubscriptionBlock)
