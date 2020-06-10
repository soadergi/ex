import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Button, { BUTTON_COLOR, BUTTON_PRIORITY } from 'weplay-components/Button'

import styles from './ShowHideButton.scss'

function ShowHideButton({
  isOpened,
  handleClick,
}) {
  const t = useTranslation()

  return (
    <div className="u-text-center u-mt-3 u-mt-sm-5">
      <Button
        onClick={handleClick}
        className={styles.button}
        color={BUTTON_COLOR.BASIC}
        priority={BUTTON_PRIORITY.SECONDARY}
      >
        {t(`events.scheduleBlock.button.${isOpened ? 'hideAll' : 'loadMore'}`)}
      </Button>
    </div>
  )
}

ShowHideButton.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
}

export default React.memo(ShowHideButton)
