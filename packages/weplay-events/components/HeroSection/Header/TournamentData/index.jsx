import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './styles.scss'
import container from './container'

const TournamentData = ({
  description,
  children,
  tournamentTitle,
  isTextAlignRight,
}) => (
  <div
    className={classNames(
      styles.dataBlock,
      styles[tournamentTitle],
      { [styles.isTextAlignRight]: isTextAlignRight },
    )}
  >
    <p className={styles.description}>{description}</p>

    <div className={styles.title}>
      {children}
    </div>
  </div>
)

TournamentData.propTypes = {
  children: PropTypes.node.isRequired,
  description: PropTypes.string.isRequired,

  isTextAlignRight: PropTypes.bool,
  tournamentTitle: PropTypes.string,
}

TournamentData.defaultProps = {
  isTextAlignRight: false,
  tournamentTitle: '',
}

export default container(TournamentData)
