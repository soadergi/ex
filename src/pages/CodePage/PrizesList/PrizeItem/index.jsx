import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './styles.scss'
import container from './container'

const PrizeItem = ({
  prize,
  isEven,
}) => (
  <li className={classNames(
    styles.timelineItem,
    { [styles.isEven]: isEven },
  )}
  >
    <div className={styles.timelineImgContainer}>
      <div className={styles.timelineImgWrapper}>
        <img
          className={styles.timelineImg}
          src={prize.imageUrl}
          alt=""
        />
      </div>
    </div>

    <div className={styles.timelineBlock}>
      <div className={styles.timelineWrapper}>
        <time className={styles.timelineDate}>{prize.description.date}</time>
        <p className={styles.timelineTitle}>{prize.description.title}</p>
        <p className={styles.timelineText}>{prize.description.text}</p>
      </div>
    </div>
  </li>
)

PrizeItem.propTypes = {
  prize: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    description: PropTypes.shape({
      date: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string,
    }),
  }).isRequired,
  isEven: PropTypes.bool.isRequired,
}

PrizeItem.defaultProps = {
  // optional props
}

export default container(PrizeItem)
