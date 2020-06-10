import React from 'react'
import PropTypes from 'prop-types'

import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import GradientLink from 'weplay-components/GradientLink'
import Section, { BORDER, BORDER_COLOR } from 'weplay-components/_wrappers/Section/'
import Separator from 'weplay-components/Separator/Separator'

import tournamentPropType from 'weplay-competitive/customPropTypes/tournamentPropType'
import TournamentsListing from 'weplay-competitive/components/TournamentsListing'

import HeadlineWrapper from '../HeadLineWrapper'

import container from './container'

const img = {
  ru: 'https://static-prod.weplay.tv/2020-04-14/300dedebcb20ddb848cb10b87f5ccfa5.0B152D-D6B5BF-5DAFCE.png',
  en: 'https://static-prod.weplay.tv/2020-04-14/92cf8ed83dda9eb77cee590ae9dbb61d.0B152C-D7BBC7-5DAFCD.png',
}

const MainPageTournamentsListing = ({
  // required props
  homepageTournaments,

  // container props
  fetchedRecords,
  i18nTexts,

  // optional props
}) => (
  <Section
    hasBorder={BORDER.BOTTOM}
    borderColor={BORDER_COLOR.DARK}
  >
    <ContentContainer>
      <HeadlineWrapper
        linkUrl={homepageTournaments.linkUrl}
        linkText={homepageTournaments.linkText}
        title={homepageTournaments.title}
        text={homepageTournaments.description}
        img={img}
        imgAlt="Tournament Platform"
      />
      <Separator
        size="large"
      />
      <GradientLink
        to={homepageTournaments.secondaryLinkUrl}
        text={homepageTournaments.secondaryLinkText}
      />
      <TournamentsListing
        tournaments={fetchedRecords}
        emptyStateText={i18nTexts.competitive.member.emptyText.noTournamentsByFilter}
      />
    </ContentContainer>
  </Section>
)

MainPageTournamentsListing.propTypes = {
  // required props
  homepageTournaments: PropTypes.shape({
    linkUrl: PropTypes.string,
    linkText: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    secondaryLinkUrl: PropTypes.string,
    secondaryLinkText: PropTypes.string,
  }).isRequired,

  // container props
  fetchedRecords: PropTypes.arrayOf(tournamentPropType).isRequired,
  i18nTexts: PropTypes.shape({}).isRequired,

  // optional props
}

MainPageTournamentsListing.defaultProps = {
  // optional props
}

export default container(MainPageTournamentsListing)
