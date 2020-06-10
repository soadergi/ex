import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import LegacyButton from 'weplay-components/LegacyButton'
import SvgIcon from 'weplay-components/SvgIcon'

import styles from './styles.scss'

const GameItem = ({
  // required props
  game,
  iconName,
  isAdded,
  isDisabled,
  errorMessage,
  // container props

  // optional props

}) => (
  <div className={styles.block}>
    <div className={styles.content}>
      <p className={styles.heading}>
        <SvgIcon
          iconName={iconName}
          type="color"
          className={styles.icon}
        />
        <span>{game}</span>
      </p>
      { isAdded
        ? <p className={styles.success}>Game added</p>
        : (
          <LegacyButton
            disabled={isDisabled}
            text="Add game"
          />
        ) }
    </div>
    {errorMessage
      && (
      <p className={
          classNames(
            styles.error,
            'u-color-error',
            'u-text-right',
          )
        }
      >
        {errorMessage}
      </p>
      )}
  </div>

)

GameItem.propTypes = {
  // required props
  game: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  isAdded: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  // container props

  // optional props

}

GameItem.defaultProps = {
  // optional props

}

export default GameItem
