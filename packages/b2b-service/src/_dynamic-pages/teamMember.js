import Router from 'next/router'
import React, { useState } from 'react'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import SeoTags from 'components/SeoTags/SeoTags'
import { LEADERS_LIST } from 'components/Leaders/leadersList'
import { TEAM_LIST } from 'components/LeadershipTeam/leadershipTeamList'
import MemberPage from 'components/MemberPage/MemberPage'
import MemberNavigationBar from 'components/MemberNavigationBar/MemberNavigationBar'

import { useKeyPress } from 'hooks/useKeyPress'
import { useSwipe } from 'hooks/useSwipe'

import { mapMembers } from 'helpers/mapMembers'
import { getNextHref } from 'helpers/getNextHref'

const teamPagePath = '/team'
const ALL_MEMBERS = mapMembers([...LEADERS_LIST, ...TEAM_LIST])

const TeamMemberPage = ({ router, locale }) => {
  const t = useTranslation()
  const initialMemberIndex = ALL_MEMBERS.findIndex(member => member.slug === router.query.memberName)
  const [currentMemberIndex, setCurrentMemberIndex] = useState(initialMemberIndex)
  const prevMemberIndex = currentMemberIndex === 0 ? ALL_MEMBERS.length - 1 : currentMemberIndex - 1
  const nextMemberIndex = currentMemberIndex === ALL_MEMBERS.length - 1 ? 0 : currentMemberIndex + 1

  const currentMember = ALL_MEMBERS[currentMemberIndex]

  const linkToPrevMember = `${teamPagePath}/${ALL_MEMBERS[prevMemberIndex].slug}`
  const linkToNextMember = `${teamPagePath}/${ALL_MEMBERS[nextMemberIndex].slug}`
  const linkTo = {
    prevMember: linkToPrevMember,
    teamPage: teamPagePath,
    nextMember: linkToNextMember,
  }

  const langPrefix = locale === 'en' ? '' : `/${locale}`

  const showPrevMember = () => {
    const href = getNextHref(linkToPrevMember)
    setCurrentMemberIndex(prevMemberIndex)
    Router.replace(href, `${langPrefix}${linkToPrevMember}`)
  }
  const showNextMember = () => {
    const href = getNextHref(linkToNextMember)
    setCurrentMemberIndex(nextMemberIndex)
    Router.replace(href, `${langPrefix}${linkToNextMember}`)
  }

  const show = {
    prevMember: showPrevMember,
    nextMember: showNextMember,
  }

  useKeyPress('ArrowLeft', showPrevMember)
  useKeyPress('ArrowRight', showNextMember)
  useSwipe(showPrevMember, showNextMember)

  const seo = t('teamPage.member.seo.title')
  const seoTitle = `${t(currentMember.nameKey)} • ${seo}`
  const seoDescription = `${t(currentMember.nameKey)} - ${t(currentMember.positionKey)} • ${seo}`
  const seoImg = {
    url: t(currentMember.landscapePhotoKey),
    width: 1024,
    height: 528,
  }

  return (
    <>
      <SeoTags
        title={seoTitle}
        description={seoDescription}
        img={seoImg}
      />
      <MemberPage member={currentMember}>
        <MemberNavigationBar
          linkTo={linkTo}
          show={show}
        />
      </MemberPage>
    </>
  )
}

export default withLocale(TeamMemberPage)
