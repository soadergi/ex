import React from 'react'

import ProjectBreadcrumbs from '_dynamic-pages/new-project/components/ProjectBreadcrumbs'

import Section, { PADDING_Y } from 'weplay-components/_wrappers/Section'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import SubscriptionBlock from 'weplay-components/SubscriptionBlock'

import AlternateHead from 'components/AlternateHead/AlternateHead'

import { getProjectPageInitialProps } from './getProjectsPageInitialProps'
import CompletedProjects from './CompletedProjects/CompletedProjects'
import ProjectsMainBlock from './ProjectsMainBlock'

const subscribeFormModifiers = ['lightTheme']
const locationPage = 'weplay_business_general'

const ProjectsPage = ({
  initialPromoEvent,
  initialCompletedEvents,
}) => {
  const alternateLinks = {
    ru: 'https://about.weplay.tv/ru/projects',
    en: 'https://about.weplay.tv/projects',
  }

  const isCompletedProjectsExists = Boolean(initialCompletedEvents.length)

  return (
    <>
      <AlternateHead links={alternateLinks} />

      <ProjectsMainBlock initialPromoEvent={initialPromoEvent} />

      <ProjectBreadcrumbs />

      {isCompletedProjectsExists && <CompletedProjects allProjects={initialCompletedEvents} />}

      <Section
        paddingY={PADDING_Y.SM}
        className="u-mb-6"
      >
        <ContentContainer>
          <SubscriptionBlock
            modifiers={subscribeFormModifiers}
            pageName={locationPage}
          />
        </ContentContainer>
      </Section>
    </>
  )
}

ProjectsPage.getInitialProps = async ({ ctx, initialLocale }) => getProjectPageInitialProps({ ctx, initialLocale })

export default ProjectsPage
