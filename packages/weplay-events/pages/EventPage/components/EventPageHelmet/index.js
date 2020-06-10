import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import PageHelmet from 'weplay-components/PageHelmet'
import HrefLangLink from 'weplay-components/HrefLangLink'

import { getSeoSnippetByTournamentIdSelector } from 'weplay-events/reduxs/seoSnippet/selectors'
import { useCurrentTournamentId } from 'weplay-events/pages/EventPage/CurrentTournamentIdProvider'

const EventPageHelmet = ({ tournamentSlug, pathname }) => {
  const t = useTranslation()
  const tournamentId = useCurrentTournamentId()

  const {
    description,
    title,
    imageUrl,
  } = useSelector(getSeoSnippetByTournamentIdSelector)(tournamentId)

  const tournamentSectionSEOName = useMemo(() => {
    const tournamentSectionName = pathname.split('/').pop()
    if (tournamentSectionName === tournamentSlug) {
      return ''
    }

    return `${t(`events.seoBlock.${tournamentSectionName}`)}  — `
  }, [tournamentSlug, pathname])

  // adds subroute (section) name to seo
  const seoInfo = useMemo(() => ({
    title: `${tournamentSectionSEOName}${title}`,
    description: `${tournamentSectionSEOName}${description}`,
  }), [title, description, tournamentSectionSEOName])

  return (
    <>
      <PageHelmet
        seoInfo={seoInfo}
        ogImage={imageUrl}
      />

      <HrefLangLink pathname={pathname} />
    </>
  )
}

EventPageHelmet.propTypes = {
  tournamentSlug: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
}

export default React.memo(EventPageHelmet)
