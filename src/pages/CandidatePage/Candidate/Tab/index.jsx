import React from 'react'
import PropTypes from 'prop-types'
import className from 'classnames'

import container from './container'
import styles from './styles.scss'

const CandidateTab = ({
  // required props
  tab,
  onClick,
  isActive,

  // props from container

  // optional props
}) => (
  <button
    type="button"
    className={className(
      styles.button,
      {
        [styles.isActive]: isActive,
      },
    )}
    onClick={onClick}
  >
    <span className={styles.text}>{tab.title}</span>
  </button>
)

CandidateTab.propTypes = {
  // required props
  tab: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,

  // props from container

  // optional props
}

CandidateTab.defaultProps = {
  // optional props
}

export default container(CandidateTab)
