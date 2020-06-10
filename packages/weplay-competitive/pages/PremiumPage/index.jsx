import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { NAMES } from 'weplay-core/routes'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import PageHelmet from 'weplay-components/PageHelmet'
import Wrapper from 'weplay-competitive/components/Wrapper'
import { createEcommerceParams } from 'weplay-core/helpers/createCustomAnalEvents'
import { ECOMMERCE_EVENT } from 'weplay-core/services/webAnalytics'

import PremiumDescriptionBock from './PremiumDescriptionBock'
import CardsBlock from './CardsBlock'
import Switcher from './Switcher'
import container from './container'
import styles from './styles.scss'

const PremiumPage = ({
  // required props

  // container props
  toggleCurrency,
  isWPCurrency,
  seoParams,
  ogImage,
  premiums,
  pushAnalEvent,
  // optional props
}) => {
  const t = useTranslation()

  useEffect(() => {
    if (premiums) {
      pushAnalEvent(ECOMMERCE_EVENT, createEcommerceParams({
        ecommerce: {
          impressions: premiums?.subscriptions.map(sub => ({
            name: `${sub.period} month`,
            id: sub.subscriptionId,
            price: sub.usdPrice,
          })),
        },
        action: 'Product Impressions',
        nonInteraction: true,
      }))
    }
  }, [premiums])

  return (
    <Wrapper className={styles.block}>
      <PageHelmet
        seoParams={seoParams}
        ogImage={ogImage}
      />
      <>
        <h1
          className={classNames(
            styles.title,
            'u-text-center',
          )}
          data-qa-id={dataQaIds.pages[NAMES.PREMIUM].container}
        >
          {t('competitive.premium.card.title')}
        </h1>
        <PremiumDescriptionBock />
        <div className={styles.switcher}>
          <span className="u-ml-auto">{t('competitive.premium.card.realMoney')}</span>
          <Switcher
            isChecked={isWPCurrency}
            onChange={toggleCurrency}
          />
          <span>{t('competitive.premium.card.points')}</span>
        </div>
        <CardsBlock
          isWpCurrency={isWPCurrency}
          className="u-mb-12"
        />
      </>
    </Wrapper>
  )
}

PremiumPage.propTypes = {
  // required props

  // container props
  isWPCurrency: PropTypes.bool.isRequired,
  toggleCurrency: PropTypes.func.isRequired,
  seoParams: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  ogImage: PropTypes.string.isRequired,
  pushAnalEvent: PropTypes.func.isRequired,
  premiums: PropTypes.shape({
    subscriptions: PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
  }),
  // optional props
}

PremiumPage.defaultProps = {
  // optional props
  premiums: null,
}

export default container(PremiumPage)
