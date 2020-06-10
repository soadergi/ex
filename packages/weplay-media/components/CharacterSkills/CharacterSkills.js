import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import CharacterTitle from 'weplay-media/components/CharacterTitle/CharacterTitle'

import CharacterSkill from './CharacterSkill/CharacterSkill'

const text = 'Every time a hero levels up, they earn an ability point, until their abilities are fully upgraded. '
  + 'The player can then spend the point to unlock one of the hero\'s abilities, or to upgrade an already learned '
  + 'ability. At the start of the game, all of a hero\'s abilities are locked, but they each start with one ability '
  + 'point which can be used at any time.'

const image = 'https://static-prod.weplay.tv/2020-05-13/104ca24089691362ea8d98609f5f8864.653F1D-ED8A0C-BC8C5C.jpeg'
const image2 = 'https://static-prod.weplay.tv/2020-05-13/5dff34b8c5ab2020612d94ffc893700e.5C3919-E27D09-F6AF36.jpeg'
const upLevel1 = 1
const upLevel3 = 3
const upLevel14 = 14
const levels = [upLevel1, upLevel3, upLevel14]
const CharacterSkills = () => {
  const t = useTranslation()
  return (
    <>
      <CharacterTitle
        title={t('mediaCore.character.tab.abilitySkillOrder')}
        text={text}
      />
      <CharacterSkill
        name="Fissure"
        image={image}
        levels={levels}
      />
      <CharacterSkill
        name="Enchant Totem"
        image={image2}
        levels={levels}
      />
    </>
  )
}

export default CharacterSkills
