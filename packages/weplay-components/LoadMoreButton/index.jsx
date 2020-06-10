import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from 'weplay-components/Icon'
import Button, { BUTTON_PRIORITY } from 'weplay-components/Button'

import container from './container'
import styles from './styles.scss'

const LoadMoreButton = ({
  isLoading,
  onClick,
  buttonText,
  className,
}) => (
  <div className={classNames(
    styles.block,
    className,
  )}
  >
    <Button
      className={styles.button}
      onClick={onClick}
      disabled={isLoading}
      priority={BUTTON_PRIORITY.SECONDARY}
    >
      <span className={classNames(
        'u-p-half',
        { [styles.isLoading]: isLoading },
      )}
      >
        <Icon
          iconName="load-more"
          size="small"
        />
      </span>
      {buttonText}
    </Button>
  </div>
)

LoadMoreButton.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  className: PropTypes.string,
}

LoadMoreButton.defaultProps = {
  className: '',
}

export default container(LoadMoreButton)
