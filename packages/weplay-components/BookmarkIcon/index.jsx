import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Icon from 'weplay-components/Icon'

import container from './container'
import styles from './styles.scss'

const colors = ['blue', 'white', 'grey']

export const BookmarkIconMarkup = ({
  // required props
  iconName,
  isButtonDisabled,
  // container props
  handleClick,
  // optional props
  color,
  isBookmarked,
  size,
}) => (
  <div className={classNames(
    styles.block,
    styles[color],
    {
      [styles.blue]: isBookmarked,
    },
  )}
  >
    <button
      type="button"
      aria-label="bookmarks"
      className={styles.button}
      onClick={handleClick}
      disabled={isButtonDisabled}
    >
      <Icon
        iconName={iconName}
        size={size}
      />
    </button>
  </div>
)

BookmarkIconMarkup.propTypes = {
  // required props
  iconName: PropTypes.string.isRequired,
  isButtonDisabled: PropTypes.bool.isRequired,
  // container props
  handleClick: PropTypes.func.isRequired,
  // optional props
  color: PropTypes.oneOf(['', ...colors]),
  size: PropTypes.string,
  isBookmarked: PropTypes.bool,
}

BookmarkIconMarkup.defaultProps = {
  // optional props
  size: '',
  color: '',
  isBookmarked: false,
}

export default container(BookmarkIconMarkup)
