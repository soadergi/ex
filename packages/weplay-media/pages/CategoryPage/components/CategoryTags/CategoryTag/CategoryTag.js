import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './CategoryTag.scss'

const CategoryTag = ({
  tag,
  onClick,
  isTagActive,
  isDisabled,
}) => {
  const isSpecialTag = tag.type === 'special_tag'
  return (
    <button
      type="button"
      className={classNames(
        styles.block,
        {
          [styles.specialTag]: isSpecialTag,
          [styles.active]: isTagActive,
          [styles.disabled]: isDisabled,
        },
      )}
      onClick={onClick}
      disabled={isDisabled}
    >
      {tag.name}
    </button>
  )
}

CategoryTag.propTypes = {
  tag: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  isTagActive: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
}

export default React.memo(CategoryTag)
