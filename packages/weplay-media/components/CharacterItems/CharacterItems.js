import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import CharacterTitle from 'weplay-media/components/CharacterTitle/CharacterTitle'

import CharacterItem from './CharacterItem/CharacterItem'

const CharacterItems = () => {
  const t = useTranslation()
  return (
    <>
      <CharacterTitle title={t('mediaCore.character.tab.itemBuild')} />
      <CharacterItem />
      <CharacterItem />
      <CharacterItem />
    </>
  )
}

export default CharacterItems
