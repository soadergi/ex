import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import CharacterTitle from 'weplay-media/components/CharacterTitle/CharacterTitle'

const text = 'Like a golem or gargoyle, Earthshaker was one with the earth but now walks freely upon it. '
  + 'Unlike those other entities, he created himself through an act of will, and serves no other master. '
  + 'In restless slumbers, encased in a deep seam of stone, he became aware of the life drifting freely above him. '
  + 'He grew curious. During a season of tremors, the peaks of Nishai shook themselves loose of avalanches, shifting '
  + 'the course of rivers and turning shallow valleys into bottomless chasms. When the land finally ceased quaking, '
  + 'Earthshaker stepped from the settling dust, tossing aside massive boulders as if throwing off a light blanket. '

const CharacterBiography = () => {
  const t = useTranslation()
  return (
    <CharacterTitle
      title={t('mediaCore.character.tab.biogrpaphy')}
      text={text}
      isFull
    />
  )
}

export default React.memo(CharacterBiography)
