import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import withAnalytics from 'weplay-core/HOCs/withAnalytics'

import ModalBase from 'weplay-components/ModalBase'
import InlineTabs from 'weplay-components/InlineTabs'
import Tab from 'weplay-components/Tab'
import withTabs from 'weplay-components/withTabs'
import Tip from 'weplay-components/Tip'

import premiumCardPropType from 'weplay-competitive/customPropTypes/premiumCardPropType'

import WePlayMoney from './WePlayMoney'
import StripeCheckout from './StripeCheckout'
import styles from './styles.scss'

const modalModification = ['paddingLess', 'closeBtnPositionSm']

const PremiumModal = ({
  handleClose,
  isShown,
  activePremiumCard,
  updateUserInfo,
  tabs,
  isStripeLoaded,
  // props from HOC
  activeTab,
  handleTabClick,
}) => {
  const t = useTranslation()
  const showStripePayment = activeTab.id === 'creditCard'
  return (
    <ModalBase
      isShown={isShown}
      handleClose={handleClose}
      modifiers={modalModification}
    >
      <div className={classNames(
        styles.content,
        'u-pb-2',
        'u-pb-sm-6',
      )}
      >
        <InlineTabs
          className={classNames(
            styles.tabs,
            'u-px-2',
            'u-px-sm-6',
          )}
          childClassName={styles.tabsList}
        >
          {tabs.map(tab => (
            <Tab
              key={tab.id}
              tab={tab.title}
              handleClick={handleTabClick(tab)}
              activeTab={tab === activeTab}
            />
          ))}
        </InlineTabs>
        <div className={classNames(
          'u-px-2',
          'u-px-sm-6',
        )}
        >
          {activeTab.id === 'usdBalance' && (
            <WePlayMoney
              activePremiumCard={activePremiumCard}
              updateUserInfo={updateUserInfo}
            />
          )}
          {showStripePayment && isStripeLoaded && (
            <StripeCheckout
              activePremiumCard={activePremiumCard}
            />
          )}
          {!isStripeLoaded && (
            <Tip isError>
              {t('competitive.premium.premiumModal.generalCardPaymentError')}
            </Tip>
          )}
        </div>
      </div>
    </ModalBase>
  )
}

PremiumModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isShown: PropTypes.bool.isRequired,
  updateUserInfo: PropTypes.func.isRequired,
  activePremiumCard: premiumCardPropType.isRequired,
  isStripeLoaded: PropTypes.bool.isRequired,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
  // props from HOC
  activeTab: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  handleTabClick: PropTypes.func.isRequired,
}

export default withAnalytics(withTabs(PremiumModal))
