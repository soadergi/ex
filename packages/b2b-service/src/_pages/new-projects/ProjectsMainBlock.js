import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import HeroSectionBtb from 'components/HeroSectionBtb/HeroSectionBtb'

import image from '_pages/index/img/home.jpg'

const ProjectsMainBlock = ({ initialPromoEvent }) => {
  const t = useTranslation()
  const goToLink = initialPromoEvent && `/projects/${initialPromoEvent.event?.url}-${initialPromoEvent.event?.id}`

  return initialPromoEvent ? (
    <HeroSectionBtb
      labels={initialPromoEvent.event.tournamentData.labels}
      startDate={initialPromoEvent.event.tournamentData.startDate}
      endDate={initialPromoEvent.event.tournamentData.endDate}
      title={initialPromoEvent.event.tournamentData.fullName}
      text={initialPromoEvent.event.tournamentData.description}
      goToLink={goToLink}
      image={initialPromoEvent.path}
      isLightTheme
    />
  ) : (
    <HeroSectionBtb
      title={t('heroSection.title')}
      text={t('heroSection.text')}
      buttonText={t('heroSection.button')}
      image={image}
    />
  )
}

export default React.memo(ProjectsMainBlock)
