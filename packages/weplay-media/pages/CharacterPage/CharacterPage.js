import React, { useState } from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Section, { BACKGROUNDS } from 'weplay-components/_wrappers/Section'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import InlineTabs from 'weplay-components/InlineTabs'
import Tab from 'weplay-components/Tab'

import CharacterInfo from 'weplay-media/components/CharacterInfo/CharacterInfo'
import CharacterItems from 'weplay-media/components/CharacterItems/CharacterItems'

import styles from './CharacterPage.scss'

const tabs = [
  {
    id: 1,
    title: 'character.tab.overview',
  },
  {
    id: 2,
    title: 'character.tab.abilities',
  },
  {
    id: 3,
    title: 'character.tab.talentTree',
  },
  {
    id: 4,
    title: 'character.tab.abilitySkillOrder',
  },
  {
    id: 5,
    title: 'character.tab.itemBuild',
  },
  {
    id: 6,
    title: 'character.tab.recentChanges',
  },
  {
    id: 7,
    title: 'character.tab.biogrpaphy',
  },
]

const CharacterPage = () => {
  const t = useTranslation()
  const [isActive, setActiveTab] = useState(tabs[0])
  return (
    <Section backgrounds={BACKGROUNDS.ROYAL}>
      <ContentContainer>
        <CharacterInfo />
        <InlineTabs className={styles.tabs}>
          {tabs.map(tab => (
            <Tab
              key={tab.id}
              tab={t(`mediaCore.${tab.title}`)}
              color="white"
              activeTab={tab === isActive}
              handleClick={() => setActiveTab(tab)}
            />
          ))}
        </InlineTabs>
        <CharacterItems />
      </ContentContainer>
    </Section>
  )
}

export default React.memo(CharacterPage)
