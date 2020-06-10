import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './styles.scss'

const COUNT_SMALL_SCORE_MOD = 999999

const ScoreContainer = ({
  name,
  score,
  className,
}) => (
  <div className={classNames(
    styles.block,
    className,
  )}
  >
    <div className={styles.name}>{name}</div>
    <div className={classNames(
      styles.score,
      { [styles.small]: score > COUNT_SMALL_SCORE_MOD },
    )}
    >
      {score}
    </div>
  </div>
)

ScoreContainer.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  className: PropTypes.string,
}

ScoreContainer.defaultProps = {
  className: '',
}

export default ScoreContainer
