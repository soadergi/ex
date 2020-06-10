import React, {
  useRef, useEffect, useState, useMemo,
} from 'react'
import classNames from 'classnames'
import { useParams } from 'react-router-dom'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import InlineTabs from 'weplay-components/InlineTabs'
import Tab from 'weplay-components/Tab'

import { useEventsPageRefsProvider } from 'weplay-events/pages/EventPage/EventsPageRefsProvider'

import styles from './styles.scss'
import TeamCard from './TeamCard'
import { useTeamsList } from './container'

const tabs = ['1', '2']

const TeamsList = () => {
  const t = useTranslation()
  const { tournamentSlug } = useParams()
  const allTeams = useTeamsList()
  const blockRef = useRef(null)
  const { setParticipantsBlockRef } = useEventsPageRefsProvider()
  const [activeTab, setActiveTab] = useState(tabs[0])
  const isPushkaLeaguePage = tournamentSlug === 'we-play-pushka-league'

  useEffect(() => {
    setParticipantsBlockRef(blockRef)
  }, [blockRef])

  const divisions = useMemo(() => (isPushkaLeaguePage
    ? allTeams.reduce((acc, team) => {
      const division = team.extraInfo?.etsFields?.find(field => field.key === 'division') ?? null

      if (division?.value) {
        acc[division.value].push(team)
      }

      return acc
    }, { 1: [], 2: [] })
    : {}), [isPushkaLeaguePage, allTeams])

  return (
    <>
      <p
        className={styles.title}
        ref={blockRef}
      >
        {t(`events.tournamentStages.${tournamentSlug}.invitedTeams.0`)}
      </p>

      {isPushkaLeaguePage && (
        <>
          <InlineTabs
            className={styles.inlineTabs}
            hasSeparator
          >
            {tabs.map(tab => (
              <Tab
                key={tab}
                tab={`${t('events.tournamentStages.we-play-pushka-league.participants.division')} ${tab}`}
                activeTab={tab === activeTab}
                handleClick={() => setActiveTab(tab)}
              />
            ))}
          </InlineTabs>
          <div className={classNames(styles.grid)}>
            {divisions[activeTab].map(team => (
              <div
                key={team.id}
                className={styles.gridItem}
              >
                <TeamCard team={team} />
              </div>
            ))}
          </div>
        </>
      )}

      {!isPushkaLeaguePage && (
        <div className={classNames(styles.grid)}>
          {allTeams.map(team => (
            <div
              key={team.id}
              className={styles.gridItem}
            >
              <TeamCard team={team} />
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default TeamsList
