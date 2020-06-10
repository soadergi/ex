import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import EventCard from 'weplay-components/EventCard'

import container from './container'
import styles from './styles.scss'

const Events = ({
  // required props
  // container props
  isStreamPlayerVisible,
  promoEvents,
  // optional props
}) => (
  <div className={classNames(
    styles.block,
    { [styles.isStreamPlayerVisible]: isStreamPlayerVisible },
  )}
  >
    <div className={styles.cards}>
      {promoEvents.map(promoEvent => (
        <EventCard
          key={promoEvent.id}
          promoEvent={promoEvent}
          rootPage
        />
      ))}
    </div>
  </div>
)

Events.propTypes = {
  // required props
  // container props
  isStreamPlayerVisible: PropTypes.bool.isRequired,
  promoEvents: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  // optional props
}

Events.defaultProps = {
  // optional props
}

export default container(Events)
