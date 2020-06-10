import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Checkbox from 'weplay-components/Checkbox'
import Switcher from 'weplay-components/Switcher'
import BackgroundFullWidth from 'weplay-components/BackgroundFullWidth'
import Image from 'weplay-components/Image'

import styles from './styles.scss'
import container from './container'
import InfoMessage from './InfoMessage'

const checkBoxModifiers = ['bordered']

const SubscriptionCard = ({
  // required props
  subscription,
  // container props
  locale,
  isLoggedIn,
  toggleUserSubscription,
  isChecked,
  toggleUserAllowCheckbox,
  isDataFetching,
  // optional props
  isUserSubscribed,
}) => {
  const t = useTranslation()
  return (
    <div
      className={classNames(
        styles.block,
        {
          [styles.isBordered]: (isUserSubscribed && subscription.isActive),
          [styles.isDisabled]: !subscription.isActive,
        },
      )}
    >
      <div className={styles.imgWrapper}>
        <BackgroundFullWidth
          src={subscription.localizations[locale]?.coverImage}
          alt={subscription.localizations[locale]?.title}
          className={styles.preview}
        />
        <Image
          src={subscription.localizations[locale]?.iconImage}
          alt={`${subscription.localizations[locale]?.title}-logo`}
          className={styles.logo}
        />
      </div>

      <div className={styles.content}>
        <p className={styles.title}>{subscription.localizations[locale]?.title}</p>
        {subscription.isActive
          ? <p className={styles.description}>{subscription.localizations[locale]?.description}</p>
          : <InfoMessage text={t('mediaCore.profile.subscriptions.noExists')} />}

        {isLoggedIn && subscription.isActive && (
          <>
              {!isUserSubscribed && (
              <div className={styles.checkboxWrapper}>
                <Checkbox
                  id={`allowData-${subscription.id}`}
                  modifiers={checkBoxModifiers}
                  onChange={toggleUserAllowCheckbox}
                >
                  <span className={styles.checkboxLabel}>{t('mediaCore.profile.subscriptions.allowUseData')}</span>
                </Checkbox>
              </div>
              )}
            <div className={styles.switcherWrapper}>
              <label
                className={styles.switcherLabel}
                htmlFor={`subscription-${subscription.id}`}
              >
                {isUserSubscribed
                  ? t('mediaCore.profile.subscriptions.unsubscribe')
                  : t('mediaCore.profile.subscriptions.subscribe')}
              </label>
              <Switcher
                id={`subscription-${subscription.id}`}
                disabled={(!isUserSubscribed && !isChecked) || isDataFetching}
                isHighlighted={isChecked}
                value={isUserSubscribed}
                onChange={toggleUserSubscription}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

SubscriptionCard.propTypes = {
  // required props
  subscription: PropTypes.shape({
    localizations: PropTypes.shape({}).isRequired,
    isActive: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  // container props
  locale: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  toggleUserSubscription: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
  toggleUserAllowCheckbox: PropTypes.func.isRequired,
  isDataFetching: PropTypes.bool.isRequired,
  // optional props
  isUserSubscribed: PropTypes.bool,
}

SubscriptionCard.defaultProps = {
  isUserSubscribed: false,
}

export default container(SubscriptionCard)
