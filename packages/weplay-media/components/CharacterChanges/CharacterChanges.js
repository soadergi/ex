import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import CharacterTitle from 'weplay-media/components/CharacterTitle/CharacterTitle'

import CharacterChange from './CharacterChange/CharacterChange'

const CharacterChanges = () => {
  const t = useTranslation()
  return (
    <>
      <CharacterTitle
        title={t('mediaCore.character.tab.recentChanges')}
      />
      <CharacterChange />
      <CharacterChange />
    </>
  )
}

export default CharacterChanges
