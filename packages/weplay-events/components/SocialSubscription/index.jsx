import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'
import LegacyButton from 'weplay-components/LegacyButton'
import BackgroundFullWidth from 'weplay-components/BackgroundFullWidth'
import Icon from 'weplay-components/Icon'
import Link from 'weplay-components/Link'

import container from './container'
import styles from './styles.scss'

const SocialSubscription = ({
  // required props
  discordUrl,
  telegramUrl,
  redditUrl,
  triggerSignUpModal,
  hasButton,

  // container props

  // optional props
  backgroundUrl,
  hasWhiteText,
  title,
  text,
}) => {
  const t = useTranslation()

  return (
    <div className={classNames(
      styles.block,
      { [styles.hasWhiteText]: hasWhiteText },
    )}
    >
      {backgroundUrl && (
        <BackgroundFullWidth
          src={backgroundUrl}
        />
      )}

      <div className={styles.headline}>
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{text}</p>
      </div>

      <div
        className={styles.wrap}
      >
        {discordUrl && (
          <Link
            to={discordUrl}
            rel="noreferrer noopener"
            target="_blank"
            className={classNames(
              styles.link,
              styles.discord,
            )}
            isExternal
            {...getAnalyticsAttributes({
              action: 'Join Discord Channel',
              category: 'Social',
              label: 'Discord',
            })}
          >
            <Icon
              iconName="discord-contained"
              className={styles.icon}
            />
            <span
              className={styles.text}
            >
              {t('events.socialSubscription.discordLink')}
            </span>
          </Link>
        )}
        {telegramUrl && (
          <Link
            to={telegramUrl}
            rel="noreferrer noopener"
            target="_blank"
            className={classNames(
              styles.link,
              styles.telegram,
            )}
            isExternal
            {...getAnalyticsAttributes({
              action: 'Join Telegram Channel',
              category: 'Social',
              label: 'Telegram',
            })}
          >
            <Icon
              iconName="telegramMedia"
              className={styles.icon}
            />
            <span
              className={styles.text}
            >
              {t('events.socialSubscription.telegramLink')}
            </span>
          </Link>
        )}
        {redditUrl && (
          <Link
            to={redditUrl}
            rel="noreferrer noopener"
            target="_blank"
            className={classNames(
              styles.link,
              styles.reddit,
            )}
            isExternal
            {...getAnalyticsAttributes({
              action: 'Join Reddit Channel',
              category: 'Social',
              label: 'Reddit',
            })}
          >
            <Icon
              iconName="reddit"
              className={styles.icon}
            />
            <span
              className={styles.text}
            >
              {t('events.socialSubscription.redditLink')}
            </span>
          </Link>
        )}
        {hasButton && (
          <LegacyButton
            type="button"
            text={t('events.socialSubscription.signInButton')}
            className={styles.button}
            onClick={triggerSignUpModal}
          />
        )}
      </div>
    </div>
  )
}

SocialSubscription.propTypes = {
  // required props
  triggerSignUpModal: PropTypes.func.isRequired,
  discordUrl: PropTypes.string.isRequired,
  telegramUrl: PropTypes.string.isRequired,
  redditUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,

  // container props

  // optional props
  hasButton: PropTypes.bool,
  hasWhiteText: PropTypes.bool,
  backgroundUrl: PropTypes.shape({}),
}

SocialSubscription.defaultProps = {
  // optional props
  hasButton: false,
  hasWhiteText: false,
  backgroundUrl: null,
}

export default container(SocialSubscription)
