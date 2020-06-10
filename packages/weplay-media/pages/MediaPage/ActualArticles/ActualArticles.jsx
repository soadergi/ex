import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import NewsFeed from 'weplay-media/components/Newsfeed/loadable'

const ActualArticles = ({
  latestIds,
}) => {
  const t = useTranslation()
  return (
    <NewsFeed
      latestIds={latestIds}
      titleText={t('mediaCore.mediaPage.actualTitle')}
    />
  )
}

ActualArticles.propTypes = {
  latestIds: PropTypes.arrayOf(PropTypes.number).isRequired,
}

export default React.memo(ActualArticles)
