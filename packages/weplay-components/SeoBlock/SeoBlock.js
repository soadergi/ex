import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Icon from '../Icon'
import Button, { BUTTON_PRIORITY } from '../Button'

import styles from './SeoBlock.scss'
import container from './container'

const SeoBlock = ({
  // required props
  content,
  // container props
  isOpened,
  clickHandler,
  buttonText,
  // optional props
  title,
  isDisclaimer,
  isDarkMode,
}) => (
  <div className={classNames(
    styles.block,
    {
      [styles.isOpened]: isOpened,
      [styles.isDisclaimer]: isDisclaimer,
      [styles.isDarkMode]: isDarkMode,
    },
  )}
  >
    {title && <h2 className={styles.title}>{title}</h2>}
    <div className={styles.text}>
      {content}
    </div>

    {!isDisclaimer && (
    <Button
      className={styles.button}
      onClick={clickHandler}
      priority={BUTTON_PRIORITY.LINK}
    >
      {buttonText}
      <Icon
        className={styles.icon}
        iconName="arrow-down-second"
      />
    </Button>
    )}
  </div>

)

SeoBlock.propTypes = {
  // required props
  content: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  // container props
  isOpened: PropTypes.bool.isRequired,
  clickHandler: PropTypes.func.isRequired,
  // optional props
  title: PropTypes.string,
  isDisclaimer: PropTypes.bool,
  isDarkMode: PropTypes.bool,
}

SeoBlock.defaultProps = {
  // optional props
  title: '',
  isDisclaimer: false,
  isDarkMode: false,
}

export default container(SeoBlock)
