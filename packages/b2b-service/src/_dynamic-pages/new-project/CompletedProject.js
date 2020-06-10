import React from 'react'

import SubscriptionBlock from 'weplay-components/SubscriptionBlock'

import B2BSection from 'components/B2BSection/B2BSection'

import ExplanationBlock from './components/ExplanationBlock'
import MainBlock from './components/MainBlock'
import ProjectBreadcrumbs from './components/ProjectBreadcrumbs'
import GalleryBlock from './components/GalleryBlock'
import SocialBlock from './components/SocialBlock'
import InfographicBlock from './components/InfographicBlock'
import PartnersBlock from './components/PartnersBlock'
import NewspapersBlock from './components/NewspapersBlock'
import BrandIntegrationCasesBlock from './components/BrandIntegrationCasesBlock'
import BannerBlock from './components/BannerBlock'

const locationPage = 'weplay_business_general'
const subscribeFormModifiers = ['lightTheme']

const CompletedProject = ({
  project,
  projectSlug,
  projectLocalization,
  newspapers,
  brandIntegrationNews,
}) => {
  const {
    tournamentData,
    title,
  } = project

  const {
    whatIsBlock,
    whatToExpectBlock,
    voiceOfCommunityBlock,
    targetAudienceBlock,
  } = projectLocalization

  const {
    partners,
    discipline,
    fullName: tournamentName,
  } = tournamentData

  return (
    <>
      <MainBlock
        projectLocalization={projectLocalization}
        tournamentData={tournamentData}
      />

      <ProjectBreadcrumbs
        projectTitle={title}
        projectSlug={projectSlug}
      />

      <ExplanationBlock whatIsBlock={whatIsBlock} />

      <GalleryBlock whatToExpectBlock={whatToExpectBlock} />

      <SocialBlock voiceOfCommunityBlock={voiceOfCommunityBlock} />

      {brandIntegrationNews && <BrandIntegrationCasesBlock brandIntegrationNews={brandIntegrationNews} />}

      {tournamentName && (
        <InfographicBlock
          targetAudienceBlock={targetAudienceBlock}
          tournamentName={tournamentName}
        />
      )}

      {partners && <PartnersBlock partners={partners} />}

      {newspapers && <NewspapersBlock newspapers={newspapers} />}

      <B2BSection>
        <SubscriptionBlock
          modifiers={subscribeFormModifiers}
          pageName={locationPage}
        />
      </B2BSection>

      {discipline && <BannerBlock discipline={discipline} />}
    </>
  )
}

export default CompletedProject
