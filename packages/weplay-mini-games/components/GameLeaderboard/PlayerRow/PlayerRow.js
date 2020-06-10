import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Skeleton from 'weplay-components/Skeleton'

import styles from './PlayerRow.scss'

const PlayerRow = ({
  position,
  nickname,
  score,
  hasAccent,
  color,
}) => (
  <div className={classNames(
    styles.block,
    styles[color],
    { [styles.accent]: hasAccent },
  )}
  >
    <span className={styles.value}>{position || ''}</span>
    <span className={styles.value}>{nickname || <Skeleton />}</span>
    <span className={styles.value}>{score ?? <Skeleton size="short" />}</span>
  </div>
)

PlayerRow.propTypes = {
  position: PropTypes.number.isRequired,
  nickname: PropTypes.string,
  score: PropTypes.number,
  color: PropTypes.string.isRequired,
  hasAccent: PropTypes.bool.isRequired,
}

PlayerRow.defaultProps = {
  nickname: '',
  score: NaN,
}

export default React.memo(PlayerRow)
