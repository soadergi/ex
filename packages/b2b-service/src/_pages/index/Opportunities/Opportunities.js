import React from 'react'
import sponsorImage from 'components/Services/img/brand.jpg'
import productionImage from 'components/Services/img/event.jpg'
import rightsImage from 'components/Services/img/media.jpg'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import InlineTabs from 'weplay-components/InlineTabs'
import Tab from 'weplay-components/Tab'
import withTabs from 'weplay-components/withTabs'
import Headline from 'weplay-components/HeadLine'

import Opportunity from './Opportunity/Opportunity'

const images = {
  1: sponsorImage,
  2: rightsImage,
  3: productionImage,
}

const Opportunities = ({
  handleTabClick,
  activeTab,
  tabs,
}) => {
  const t = useTranslation()
  return (
    <>
      <Headline
        className="u-text-center"
        title={t('mainPage.opportunities.title')}
      />
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
      <Opportunity
        opportunity={activeTab}
        image={images[activeTab.id]}
      />
    </>
  )
}

export default React.memo(withTabs(Opportunities))
