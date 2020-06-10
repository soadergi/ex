import React from 'react'
import ServiceSubMenu from 'components/Services/ServiceSubMenu/ServiceSubMenu'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { useModal } from 'weplay-singleton/ModalsProvider/useModal'

import InlineTabs from 'weplay-components/InlineTabs'
import Tab from 'weplay-components/Tab'
import withTabs from 'weplay-components/withTabs'
import LegacyButton from 'weplay-components/LegacyButton'

import classes from './BrandOpportunities.scss'

const BrandOpportunities = ({
  handleTabClick,
  activeTab,
  tabs,
}) => {
  const t = useTranslation()
  const contactUsModal = useModal('contactUs')
  return (
    <>
      <InlineTabs
        isCentered
        hasSeparator
        className="u-mb-3"
      >
        {tabs.map(tab => (
          <Tab
            key={tab.id}
            tab={tab.title}
            handleClick={handleTabClick(tab)}
            activeTab={tab.id === activeTab.id}
          />
        ))}
      </InlineTabs>
      <ServiceSubMenu
        services={activeTab.services}
        actionButton={(
          <li className={classes.block}>
            <p className={classes.title}>{t('services.interested')}</p>
            <LegacyButton
              className={classes.button}
              text={t('heroSection.button')}
              onClick={contactUsModal.show}
            />
          </li>
        )}
      />
    </>
  )
}

export default React.memo(withTabs(BrandOpportunities))
