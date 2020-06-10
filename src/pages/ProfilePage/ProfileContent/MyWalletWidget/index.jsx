import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import Icon from 'weplay-components/Icon'
import Link from 'weplay-components/Link'
import LegacyButton from 'weplay-components/LegacyButton'
import ConfirmModal from 'weplay-components/Modals/ConfirmModal'
import LocalizedMoment from 'weplay-components/LocalizedMoment'

import container from './container'
import styles from './styles.scss'

const buttonModification = ['blockLink']

const MyWalletWidget = ({
  // required props
  // container props
  wpPointsAmount,
  usdAmount,
  links,
  isUserHasUsd,
  handleCancelPremium,
  isPremiumAccount,
  isAutoExtendPremiumEnabled,
  expirePremiumAccountDate,
  moment,
  isConfirmModalShown,
  hideConfirmModal,
  openConfirmModal,
  // optional props
}) => {
  const t = useTranslation()
  return (
    <>
      <div className={styles.block}>
        <div className={styles.header}>
          <p className={styles.title}>{t('cabinet.walletWidget.title')}</p>
        </div>

        <div className={styles.body}>
          <div className={styles.section}>
            <div className={classNames(
              styles.wrapper,
              styles.primaryText,
            )}
            >
              <span className={styles.name}>{t('cabinet.walletWidget.wpPoints')}</span>
              <span className={styles.amount}>{`${wpPointsAmount} WP`}</span>
            </div>
          </div>

          {isUserHasUsd && (
          <div className={styles.section}>
            <div className={classNames(
              styles.wrapper,
              styles.commonText,
            )}
            >
              <span className={styles.name}>{t('cabinet.walletWidget.money')}</span>
              <span className={styles.amount}>{`$${usdAmount}`}</span>
            </div>
          </div>
          )}
          <div className={styles.divider} />
        </div>
        {isPremiumAccount && isAutoExtendPremiumEnabled && (
        <div className={styles.section}>
          <div className={classNames(
            styles.wrapper,
            styles.primaryText,
          )}
          >
            <LegacyButton
              modifiers={buttonModification}
              className={styles.unsubscribePremium}
              onClick={openConfirmModal}
            >
              {t('cabinet.walletWidget.unsubscribePremium')}
            </LegacyButton>
          </div>
          <div className={styles.divider} />
        </div>
        )}
        {isPremiumAccount && !isAutoExtendPremiumEnabled && (
        <div className={styles.section}>
          <div className={styles.wrapper}>
            <span className={styles.tip}>
              {t('cabinet.walletWidget.premiumWithoutAutoExtend', {
                date: moment(expirePremiumAccountDate).format('YYYY-MM-DD'),
              })}
            </span>
          </div>
          <div className={styles.divider} />
        </div>
        )}

        <ul className={styles.linksList}>
          {links.map(link => (
            <li
              key={link.text}
              className={styles.linksItem}
            >
              <Icon
                iconName={link.iconName}
                className={styles.icon}
              />
              <Link
                className={styles.link}
                to={link.url}
                isExternal
                target="_blank"
              >
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <ConfirmModal
        isShown={isConfirmModalShown}
        onCloseModal={hideConfirmModal}
        onConfirm={handleCancelPremium}
        title={t('competitive.premium.modals.confirmCancelPremium.title')}
        subTitle={t('competitive.premium.modals.confirmCancelPremium.subTitle', {
          date: <LocalizedMoment
            dateTime={expirePremiumAccountDate}
            formatKey="dateMonthYear"
          />,
        })}
        confirmBtnText={t('competitive.premium.modals.confirmCancelPremium.confirmBtnText')}
        closeBtnText={t('competitive.premium.modals.confirmCancelPremium.closeBtnText')}
      />
    </>
  )
}

MyWalletWidget.propTypes = {
  // required props
  // container props
  i18nTexts: PropTypes.shape({}).isRequired,
  wpPointsAmount: PropTypes.number.isRequired,
  usdAmount: PropTypes.number.isRequired,
  links: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isUserHasUsd: PropTypes.bool.isRequired,
  isPremiumAccount: PropTypes.bool.isRequired,
  isAutoExtendPremiumEnabled: PropTypes.bool.isRequired,
  handleCancelPremium: PropTypes.func.isRequired,
  moment: PropTypes.func.isRequired,
  expirePremiumAccountDate: PropTypes.string.isRequired,
  hideConfirmModal: PropTypes.func.isRequired,
  openConfirmModal: PropTypes.func.isRequired,
  isConfirmModalShown: PropTypes.bool.isRequired,
  // optional props
}

export default container(MyWalletWidget)
