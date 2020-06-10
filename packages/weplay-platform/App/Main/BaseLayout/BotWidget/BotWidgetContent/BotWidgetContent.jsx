import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from 'weplay-components/Icon'
import Link from 'weplay-components/Link'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import styles from './BotWidgetContent.scss'

const telegramBotLink = 'https://t.me/weplay_esportsbot'
export const BotWidgetContentMarkup = ({
  // required props
  closeWidget,
  // container props
  // optional props
}) => {
  const t = useTranslation()
  return (
    <div className={styles.block}>
      <p>
        {t('botWidget.text')}
        {' '}
        {t('botWidget.signUpText')}
      </p>
      <div className={styles.btnWrap}>
        <Link
          to={telegramBotLink}
          className={classNames(
            styles.button,
            styles.telegram,
          )}
          onClick={closeWidget}
          isExternal
          target="_blank"
        >
          <Icon
            iconName="telegramMedia"
            className={styles.icon}
            size="small"
          />
        Telegram
        </Link>
      </div>
    </div>
  )
}

BotWidgetContentMarkup.propTypes = {
  // required props
  closeWidget: PropTypes.func.isRequired,
  // container props
  // optional props
}

BotWidgetContentMarkup.defaultProps = {
  // optional props
}

export default React.memo(BotWidgetContentMarkup)
