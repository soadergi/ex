import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import ReminderButton from 'weplay-events/components/ReminderButton'

import container from './container'
import styles from './styles.scss'

const SubscribeBlock = ({
  // required props
  title,
  text,
  hasBg,
  league,
  subscriptionScopeId,

  // container props

  // optional props
  titleColor,
}) => (
  <div
    className={classNames(
      styles.block,
      // TODO: @Zamai fix this shit
      styles[league],
    )}
    data-event-position="EventRootPageSubscribeBlock"
  >
    <h2 className={styles.title}>
      {title}
      {hasBg && (
        <>
          {' '}
          <span className={styles.titleColor}>
            {titleColor}
          </span>
        </>
      )}
    </h2>
    <p className={styles.text}>{text}</p>
    <ReminderButton
      subscriptionScopeId={subscriptionScopeId}
      modalTitle="Forge of Masters. WePlay! League Online"
    />
  </div>

)

SubscribeBlock.propTypes = {
  // required props
  hasBg: PropTypes.bool,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  subscriptionScopeId: PropTypes.string.isRequired,

  // container props

  // optional props
  titleColor: PropTypes.string,
  league: PropTypes.string,
}

SubscribeBlock.defaultProps = {
  // optional props
  titleColor: '',
  hasBg: true,
  league: '',
}

export default container(SubscribeBlock)
