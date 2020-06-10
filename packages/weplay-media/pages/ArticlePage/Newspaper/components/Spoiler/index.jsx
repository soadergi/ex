import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import Icon from 'weplay-components/Icon'

import container from './container'
import styles from './styles.scss'

export const SpoilerMarkup = ({
  // required props
  content,
  // container props
  isOpened,
  handleClick,
  // optional props
  i18nTexts,
}) => (
  <div className={classNames(
    styles.block,
    {
      [styles.isOpened]: isOpened,
    },
  )}
  >
    <div className={styles.titleBlock}>
      <p className={styles.title}>{i18nTexts.mediaCore.spoiler.title}</p>
      <button
        type="button"
        className={styles.button}
        onClick={handleClick}
      >
        <Icon
          className={styles.icon}
          iconName="arrow-down-second"
        />
      </button>
    </div>

    <div className={styles.text}>
      {content}
    </div>

  </div>
)

SpoilerMarkup.propTypes = {
  // required props
  content: PropTypes.string.isRequired,
  i18nTexts: PropTypes.shape({}).isRequired,
  // container props
  isOpened: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  // optional props

}

SpoilerMarkup.defaultProps = {
  // optional props
}

export default container(SpoilerMarkup)
