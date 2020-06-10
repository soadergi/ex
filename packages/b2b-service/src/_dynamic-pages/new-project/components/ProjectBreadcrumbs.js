import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import B2BBreadcrumbs from 'components/B2BBreadcrumbs/B2BBreadcrumbs'

const ProjectBreadcrumbs = ({
  projectTitle,
  projectSlug,
}) => {
  const t = useTranslation()
  const allBreadcrumbs = [
    {
      name: t('common.breadcrumbs.home'),
      path: '/',
    },
    {
      name: t('projectsPage.seo.breadcrumbs.projects'),
      path: '/projects',
    },
    projectTitle && {
      name: projectTitle,
      path: `/projects/${projectSlug}`,
    },
  ].filter(Boolean)

  return <B2BBreadcrumbs allBreadcrumbs={allBreadcrumbs} />
}

export default ProjectBreadcrumbs
