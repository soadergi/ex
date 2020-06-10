import React, { useMemo } from 'react'

import { PROJECT_STATES } from 'config/projects'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import AlternateHead from 'components/AlternateHead/AlternateHead'
import SeoTags from 'components/SeoTags/SeoTags'

import NotFoundPage from '_pages/_error'

import { getProjectPageInitialProps } from 'helpers/getProjectPageInitialProps'

import CompletedProject from './CompletedProject'
import FutureProject from './FutureProject'

const ProjectPage = ({
  project,
  projectSlug,
  newspapers,
  brandIntegrationNews,
}) => {
  const { locale } = useLocale()
  const { eventLocalizations } = project
  const projectLocalization = eventLocalizations?.find(localization => localization.language === locale)

  const alternateLinks = useMemo(() => ({
    ru: `https://about.weplay.tv/ru/projects/${projectSlug}`,
    en: `https://about.weplay.tv/projects/${projectSlug}`,
  }), [projectSlug])

  const isFutureProject = project.state === PROJECT_STATES.FUTURE

  return projectLocalization ? (
    <>
      <AlternateHead links={alternateLinks} />

      <SeoTags
        title={projectLocalization.seo.title}
        description={projectLocalization.seo.description}
      />

      {isFutureProject ? (
        <FutureProject
          project={project}
          projectSlug={projectSlug}
          projectLocalization={projectLocalization}
        />
      ) : (
        <CompletedProject
          project={project}
          projectSlug={projectSlug}
          projectLocalization={projectLocalization}
          newspapers={newspapers}
          brandIntegrationNews={brandIntegrationNews}
        />
      )}
    </>
  ) : <NotFoundPage />
}

ProjectPage.getInitialProps = async ({ ctx, initialLocale }) => getProjectPageInitialProps({ ctx, initialLocale })

export default ProjectPage
