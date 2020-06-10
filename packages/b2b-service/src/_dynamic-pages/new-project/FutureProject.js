import React from 'react'

import ContactUsSection from '_pages/_app/ContactUsModal/ContactUsSection/ContactUsSection'

import MainBlock from './components/MainBlock'
import ProjectBreadcrumbs from './components/ProjectBreadcrumbs'
import ExplanationBlock from './components/ExplanationBlock'
import GalleryBlock from './components/GalleryBlock'
import PartnershipBlock from './components/PartnershipBlock'
import ParticipantsBlock from './components/ParticipantsBlock'
import BrandIntegrationOpportunitiesBlock from './components/BrandIntegrationOpportunitiesBlock'
import BannerBlock from './components/BannerBlock'
import classes from './styles.scss'

const FutureProject = ({
  project,
  projectSlug,
  projectLocalization,
}) => {
  const {
    tournamentData,
    title,
  } = project

  const {
    teams,
    discipline,
    participantsAmount,
  } = tournamentData

  const {
    whatIsBlock,
    whatToExpectBlock,
    whyPartnersWithUsBlock,
  } = projectLocalization

  return (
    <>
      <MainBlock
        projectLocalization={projectLocalization}
        tournamentData={tournamentData}
        isFutureProject
      />

      <ProjectBreadcrumbs
        projectTitle={title}
        projectSlug={projectSlug}
      />

      <ExplanationBlock whatIsBlock={whatIsBlock} />

      <GalleryBlock whatToExpectBlock={whatToExpectBlock} />

      <PartnershipBlock whyPartnersWithUsBlock={whyPartnersWithUsBlock} />

      {teams && participantsAmount && (
        <ParticipantsBlock
          teams={teams}
          participantsAmount={participantsAmount}
        />
      )}

      <BrandIntegrationOpportunitiesBlock />

      {discipline && <BannerBlock discipline={discipline} />}

      {/* TODO: @HTML please add modifier to ContactUsSection for sectionGrey and remove div wrapper */}
      <div className={classes.sectionGrey}>
        <ContactUsSection />
      </div>
    </>
  )
}

export default FutureProject
