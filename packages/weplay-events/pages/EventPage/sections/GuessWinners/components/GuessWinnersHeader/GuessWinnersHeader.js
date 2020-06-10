import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import InlineTabs from 'weplay-components/InlineTabs'
import Tab from 'weplay-components/Tab'

import SectionEventHeader from 'weplay-events/components/SectionEventHeader'

const tabs = ['matches', 'leaderBoard']

function GuessWinnersHeader({
  activeTab,
  setActiveTab,
}) {
  const t = useTranslation()
  const { locale } = useLocale()

  return (
    <>
      <SectionEventHeader
        title={t('events.predictionsMainBlock.matchList.title')}
        description={t('events.predictionsMainBlock.matchList.description')}
        linkUrl={`https://weplay.tv/${[`${locale}/`]}legal/guess-winners-rules`}
        linkText={t('events.predictionsMainBlock.regulationsLabel')}
      />

      <InlineTabs hasSeparator>
        {tabs.map(tab => (
          <Tab
            key={tab}
            tab={t(`events.predictionsMainBlock.tabs.${tab}`)}
            handleClick={() => setActiveTab(tab)}
            activeTab={tab === activeTab}
          />
        ))}
      </InlineTabs>
    </>
  )
}

GuessWinnersHeader.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
}

export default React.memo(GuessWinnersHeader)
