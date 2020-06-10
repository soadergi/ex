import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import Select from 'weplay-components/Select'
import InlineTabs from 'weplay-components/InlineTabs'
import Tab from 'weplay-components/Tab'

import { betProviders } from 'weplay-events/constants/betProvidersData'
import SectionEventHeader from 'weplay-events/components/SectionEventHeader'

import styles from './styles.scss'
import useGridSection from './useGridSection'
// eslint-disable-next-line max-len
const sponsorImage = 'https://static-prod.weplay.tv/2020-02-19/386c99a9eef095e2a2a39247af6d8bc3.101104-F6F713-91930C.png'

const GridWrapperWithControls = ({
  title,
  description,
  children,
}) => {
  const t = useTranslation()
  const { locale } = useLocale()
  const {
    activeStage,
    stageOptions,
    tabsOptions,
    handleStageChange,
    setActiveTab,
    activeTab,
    activeGrid,
  } = useGridSection()
  const customLinks = useMemo(() => [{
    url: `https://weplay.tv/${[`${locale}/`]}legal/we-play-pushka-league-regulation-division-1`,
    label: t('events.gridWrapperWithControls.sectionEventHeader.firstLinkText'),
  }, {
    url: `https://weplay.tv/${[`${locale}/`]}legal/we-play-pushka-league-regulation-division-2`,
    label: t('events.gridWrapperWithControls.sectionEventHeader.secondLinkText'),
  }], [t, locale])

  return (
    <>
      <SectionEventHeader
        title={title}
        description={description}
        sponsorImage={sponsorImage}
        linkImageUrl={betProviders.pariMatch.url.ru}
        customLinks={customLinks}
      >
        {activeStage?.name && (
          <Select
            className={styles.button}
            value={activeStage.name}
            options={stageOptions}
            onChange={handleStageChange}
          />
         )}
      </SectionEventHeader>

      <InlineTabs hasSeparator>
        {tabsOptions.map(tab => (
          <Tab
            key={tab.id}
            tab={tab.value}
            handleClick={() => setActiveTab(tab)}
            activeTab={tab.id === activeTab?.id}
          />
        ))}
      </InlineTabs>

      {children(activeGrid)}
    </>
  )
}

GridWrapperWithControls.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.func.isRequired,
}

GridWrapperWithControls.defaultProps = {
  title: '',
  description: '',
}

export default GridWrapperWithControls
