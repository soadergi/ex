import React, { useState } from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import InlineTabs from 'weplay-components/InlineTabs'

import CharacterTitle from 'weplay-media/components/CharacterTitle/CharacterTitle'

import CharacterAbility from './CharacterAbility/CharacterAbility'
import AbilitiesTab from './AbilitiesTab/AbilitiesTab'
import CharacterAbilitiesNotes from './CharacterAbilitiesNotes/CharacterAbilitiesNotes'
import styles from './CharacterAbilities.scss'

const tabs = [
  {
    id: 1,
    image: 'https://static-prod.weplay.tv/2020-05-13/104ca24089691362ea8d98609f5f8864.653F1D-ED8A0C-BC8C5C.jpeg',
    tab: 'Fissure',
  },
  {
    id: 2,
    image: 'https://static-prod.weplay.tv/2020-05-13/5dff34b8c5ab2020612d94ffc893700e.5C3919-E27D09-F6AF36.jpeg',
    tab: 'Fissure',
  },
  {
    id: 3,
    image: 'https://static-prod.weplay.tv/2020-05-13/104ca24089691362ea8d98609f5f8864.653F1D-ED8A0C-BC8C5C.jpeg',
    tab: 'Fissure',
  },
  {
    id: 4,
    image: 'https://static-prod.weplay.tv/2020-05-13/5dff34b8c5ab2020612d94ffc893700e.5C3919-E27D09-F6AF36.jpeg',
    tab: 'Fissure',
  },
]

const CharacterAbilities = () => {
  const t = useTranslation()
  const [isActive, setActiveTab] = useState(tabs[0])
  return (
    <>
      <InlineTabs className={styles.tabs}>
        {tabs.map(tab => (
          <AbilitiesTab
            key={tab.id}
            tab={tab.tab}
            image={tab.image}
            activeTab={tab === isActive}
            handleClick={() => setActiveTab(tab)}
          />
        ))}
      </InlineTabs>
      <CharacterTitle title={t('mediaCore.character.tab.abilities')} />
      <CharacterAbility />
      <CharacterAbilitiesNotes />
    </>
  )
}

export default CharacterAbilities
