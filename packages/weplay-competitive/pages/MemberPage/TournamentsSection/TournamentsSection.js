import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { useHistory } from 'weplay-singleton/RouterProvider/useHistory'
import { useParams } from 'weplay-singleton/RouterProvider/useParams'

import { goTo, NAMES } from 'weplay-core/routes'

import Button, { BUTTON_PRIORITY } from 'weplay-components/Button'

import EmptyState from 'weplay-competitive/components/EmptyState'
import TournamentsListing from 'weplay-competitive/components/TournamentsListing'
import Section from 'weplay-competitive/components/Section'
import { tournamentsSelectors } from 'weplay-competitive/reduxs/tournaments'
import { MAX_TOURNAMENTS } from 'weplay-competitive/pages/MemberPage/consts'

import styles from './TournamentsSection.scss'

const sectionModificationNoPadding = ['noPaddingY']

const TournamentsSection = ({
  memberTournamentsIds,
  isOwner,
  amountMemberTournaments,
}) => {
  const memberTournaments = useSelector(tournamentsSelectors.createRecordsByIdsSelector(memberTournamentsIds))

  const t = useTranslation()
  const history = useHistory()
  const params = useParams()

  const handleClickMoreTournaments = useCallback(
    () => goTo({
      name: NAMES.MEMBER_TOURNAMENTS,
      history,
      params,
    }),
    [history, params],
  )

  const handleClickAllTournaments = useCallback(
    () => goTo({
      name: NAMES.TOURNAMENTS,
      history,
      params,
    }),
    [history, params],
  )

  const tournamentsInView = useMemo(
    () => memberTournaments.slice(0, MAX_TOURNAMENTS),
    [memberTournaments],
  )

  return (
    <Section
      id="tournamentSection"
      title={t('competitive.member.tournamentSection.title')}
      subtitle={t('competitive.member.tournamentSection.subTitle')}
      modifiers={sectionModificationNoPadding}
    >
      {tournamentsInView.length
        ? (
          <TournamentsListing
            tournaments={tournamentsInView}
            emptyStateText={isOwner
              ? t('competitive.member.emptyText.noTournamentsOwner')
              : t('competitive.member.emptyText.noMatches')}
          />
        )
        : (
          <EmptyState
            text={isOwner
              ? t('competitive.member.emptyText.noTournamentsOwner')
              : t('competitive.member.emptyText.noTournaments')}
            avatar=""
            textButton={isOwner ? t('competitive.member.emptyText.noTournamentsLink') : ''}
            isHorizontal
            onClickHandler={handleClickAllTournaments}
          />
        )}
      {amountMemberTournaments > MAX_TOURNAMENTS && (
      <Button
        priority={BUTTON_PRIORITY.SECONDARY}
        onClick={handleClickMoreTournaments}
        className={styles.showMore}
      >
        {t('competitive.member.tournamentSection.showAll')}
      </Button>
      )}
    </Section>
  )
}

TournamentsSection.propTypes = {
  isOwner: PropTypes.bool.isRequired,
  memberTournamentsIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  amountMemberTournaments: PropTypes.number.isRequired,
}

export default TournamentsSection
