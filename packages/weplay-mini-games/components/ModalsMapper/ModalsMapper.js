import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './ModalsMapper.scss'

const ModalsMapper = ({
  currentModalName,
  children,
}) => {
  const currentModal = children.find(child => child.props.name === currentModalName)
  const hasModal = Boolean(currentModal)

  return (
    <div className={classNames(
      styles.block,
      hasModal && styles.visible,
    )}
    >
      { currentModal }
    </div>
  )
}

ModalsMapper.propTypes = {
  currentModalName: PropTypes.string,
  children: PropTypes.node.isRequired,
}

ModalsMapper.defaultProps = {
  currentModalName: null,
}

export default React.memo(ModalsMapper)
