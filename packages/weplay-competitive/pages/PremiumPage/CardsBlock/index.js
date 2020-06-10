import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import ConfirmModal from 'weplay-components/Modals/ConfirmModal'
import { BUTTON_COLOR } from 'weplay-components/Button'

import premiumCardPropType from 'weplay-competitive/customPropTypes/premiumCardPropType'

import PremiumModal from './PremiumModal'
import Card from './Card'
import container from './container'
import styles from './styles.scss'

const premiumConfirmModifier = { confirmButton: [BUTTON_COLOR.GOLD] }

const CardsBlock = ({
  // required props
  isWpCurrency,
  // container props
  sortedPremiums,
  closePremiumModal,
  activePremiumCard,
  isConfirmModalShown,
  isPremiumModalShown,
  hideConfirmBuyPremiumModal,
  handleApplyPremium,
  handleGoPremiumBtn,
  token,
  updateUserInfo,
  tabs,
  // optional props
  className,
  // props from HOCs
  isStripeLoaded,
}) => {
  const t = useTranslation()
  return (
    <div className={classNames(
      styles.block,
      className,
    )}
    >
      {sortedPremiums.map(premium => (
        <Card
          isWpCurrency={isWpCurrency}
          card={premium}
          key={premium.subscriptionId}
          onClick={() => handleGoPremiumBtn(premium)}
        />
      ))}
      {isPremiumModalShown && (
        <PremiumModal
          handleClose={closePremiumModal}
          isShown={isPremiumModalShown}
          activePremiumCard={activePremiumCard}
          token={token}
          updateUserInfo={updateUserInfo}
          tabs={tabs}
          isStripeLoaded={isStripeLoaded}
        />
      )}
      {isConfirmModalShown && (
        <ConfirmModal
          isShown={isConfirmModalShown}
          onCloseModal={hideConfirmBuyPremiumModal}
          onConfirm={handleApplyPremium}
          title={t('competitive.premium.modals.confirmBuyPremiumModal.title')}
          subTitle={t('competitive.premium.modals.confirmBuyPremiumModal.subTitle')}
          confirmBtnText={t('competitive.premium.modals.confirmBuyPremiumModal.confirmBtnText')}
          closeBtnText={t('competitive.premium.modals.confirmBuyPremiumModal.closeBtnText')}
          modifiers={premiumConfirmModifier}
        />
      )}
    </div>
  )
}

CardsBlock.propTypes = {
  // required props
  isWpCurrency: PropTypes.bool.isRequired,
  // container props
  sortedPremiums: PropTypes.arrayOf(premiumCardPropType).isRequired,
  closePremiumModal: PropTypes.func.isRequired,
  isConfirmModalShown: PropTypes.bool.isRequired,
  isPremiumModalShown: PropTypes.bool.isRequired,
  hideConfirmBuyPremiumModal: PropTypes.func.isRequired,
  handleApplyPremium: PropTypes.func.isRequired,
  handleGoPremiumBtn: PropTypes.func.isRequired,
  updateUserInfo: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  tabs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
  // optional props
  className: PropTypes.string,
  activePremiumCard: premiumCardPropType,
  // props from HOCs
  isStripeLoaded: PropTypes.bool.isRequired,
}

CardsBlock.defaultProps = {
  // optional props
  className: '',
  activePremiumCard: null,
}

export default container(CardsBlock)
