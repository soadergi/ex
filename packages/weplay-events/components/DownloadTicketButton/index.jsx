import React from 'react'
import classNames from 'classnames'
import Icon from 'weplay-components/Icon'
import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'
import LegacyButton from 'weplay-components/LegacyButton'

import { useDownloadPdfButton } from './container'
import styles from './styles.scss'

const buttonModifiers = ['blockBorderMagenta']
const buttonModifiersSuccess = ['blockSuccess']

export const DownloadTicketButton = () => {
  const {
    handleClick,
    buttonText,
    isLoggedIn,
    userEmail,
    isAnalyticsNeeded,
  } = useDownloadPdfButton()

  return (
    <div
      {...getAnalyticsAttributes({
        category: 'Download ticket',
        ...isAnalyticsNeeded && {
          action: 'click',
        },
        label: userEmail,
        position: LOOKUP,
      })}
    >
      <LegacyButton
        modifiers={isLoggedIn ? buttonModifiersSuccess : buttonModifiers}
        className={classNames(
          styles.button,
          { [styles.successButton]: isLoggedIn },
        )}
        onClick={handleClick}
      >
        {isLoggedIn && (
          <Icon
            size="small"
            iconName="arrow-link"
            className={classNames(
              styles.icon,
              'u-mr-1',
            )}
          />
        )}
        {buttonText}
      </LegacyButton>
    </div>
  )
}

export default DownloadTicketButton
