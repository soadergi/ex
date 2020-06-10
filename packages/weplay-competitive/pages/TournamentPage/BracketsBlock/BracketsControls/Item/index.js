import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Icon from 'weplay-components/Icon'
import Button, { BUTTON_PRIORITY } from 'weplay-components/Button'

import styles from './styles.scss'

const Item = ({
  // required props
  iconName,
  text,
  color,
  // container props
  // optional props
  onClickHandler,
}) => (
  <>
    {onClickHandler === null
      ? (
        <span
          className={classNames(
            styles.block,
            {
              [styles.isLastTip]: iconName === 'skull',
            },
          )}
        >
          <Icon
            iconName={iconName}
            className={classNames(
              styles.icon,
              {
                [styles.isError]: color === 'error',
                [styles.isSuccess]: color === 'success',
                [styles.isMagenta]: color === 'magenta',
              },
            )}
          />
          <span className={styles.text}>
            {text}
          </span>
        </span>
      )
      : (
        <Button
          priority={BUTTON_PRIORITY.LINK}
          onClick={onClickHandler}
          className={classNames(
            styles.block,
            {
              [styles.isLink]: onClickHandler,
            },
          )}
        >
          <Icon
            iconName={iconName}
            className={styles.icon}
          />
          <span className={styles.text}>
            {text}
          </span>
        </Button>
      )}
  </>
)

Item.propTypes = {
  // required props
  text: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  // container props
  // optional props
  onClickHandler: PropTypes.func,
  color: PropTypes.string,
}

Item.defaultProps = {
  // optional props
  onClickHandler: null,
  color: '',
}

export default Item
