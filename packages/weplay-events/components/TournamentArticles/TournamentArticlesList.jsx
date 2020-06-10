import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import articlesPropType from 'weplay-core/customPropTypes/articlesPropType'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import ArticlesList from 'weplay-components/ArticlesList'

import container from './container'

const TournamentArticlesList = ({
  // props from container
  sourceType,
  sourceId,
  first4Articles,
  tournamentTitle,
  isEventsPage,
}) => {
  const t = useTranslation()

  return (
    <ArticlesList
      tournamentTitle={tournamentTitle}
      title={t('events.mediaHeaders.articles.title')}
      linkUrl={`/${_.kebabCase(sourceType)}s/${sourceId}`}
      linkText={t('events.mediaHeaders.articles.link')}
      articles={first4Articles}
      modifications={['twoColumnsMedium']}
      isLinkVisible
      isEventsPage={isEventsPage}
    />
  )
}

TournamentArticlesList.propTypes = {
  // required props
  sourceType: PropTypes.string.isRequired,
  sourceId: PropTypes.number.isRequired,
  first4Articles: articlesPropType.isRequired,
  tournamentTitle: PropTypes.string.isRequired,
  isEventsPage: PropTypes.bool,
}

TournamentArticlesList.defaultProps = {
  // optional props
  isEventsPage: false,
}

export default container(TournamentArticlesList)
