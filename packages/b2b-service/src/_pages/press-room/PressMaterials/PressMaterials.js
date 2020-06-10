import React, { useCallback, useState, useMemo } from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Headline from 'weplay-components/HeadLine'
import LoadMoreButton from 'weplay-components/LoadMoreButton'

import PressMaterialCard from './PressMaterialCard/PressMaterialCard'
import classes from './PressMaterials.scss'

const MATERIALS_LIMIT = 12
const LOAD_MORE_LIMIT = 3

const PressMaterials = ({
  title,
  description,
  initialMaterials,
}) => {
  const t = useTranslation()
  const [materials, setMaterials] = useState(initialMaterials)
  const [isMaterialsLoading, setLoading] = useState(false)

  // This block is a preparation for when we will request real data.
  // Now it imitates loading of additional three articles.
  const loadMoreMaterials = useCallback(() => {
    setLoading(true)
    setMaterials([...materials, ...initialMaterials.slice(LOAD_MORE_LIMIT)])
    setLoading(false)
  }, [initialMaterials, materials])

  const hasMore = useMemo(
    () => MATERIALS_LIMIT > materials.length,
    [materials.length],
  )

  return (
    <div className={classes.block}>
      <Headline
        className="u-text-center"
        title={title}
        text={description}
      />

      <div className={classes.materials}>
        {materials.map(material => (
          <PressMaterialCard material={material} />
        ))}
      </div>

      <LoadMoreButton
        isLoading={isMaterialsLoading}
        onClick={loadMoreMaterials}
        buttonText={t('pressRoomPage.eventPressMaterials.loadMoreButton.text')}
        isVisible={hasMore}
      />
    </div>
  )
}

export default React.memo(PressMaterials)
