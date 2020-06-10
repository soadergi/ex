import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import PrizeSection from './PrizeSection'
import container from './container'
import styles from './styles.scss'

const PrizeScale = ({
  // required props
  prizes,
  // container props
  countParticipants,
  // optional props
  className,
}) => (
  <div className={classNames(
    styles.block,
    className,
  )}
  >
    <ul className={styles.list}>
      {prizes.map((item, index) => (
        <PrizeSection
          item={item}
          index={index}
          isLast={index === (prizes.length - 1)}
          key={item.minPosition}
          countParticipants={countParticipants}
        />
      ))}
    </ul>
  </div>
)

PrizeScale.propTypes = {
  // required props
  prizes: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string]),
    value: PropTypes.string,
  })).isRequired,
  countParticipants: PropTypes.number.isRequired,
  // container props

  // optional props
  className: PropTypes.string,
}

PrizeScale.defaultProps = {
  // optional props
  className: '',
}

export default container(PrizeScale)
