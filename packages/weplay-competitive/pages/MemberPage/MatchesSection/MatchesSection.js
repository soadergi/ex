import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { useParams } from 'weplay-singleton/RouterProvider/useParams'
import { useHistory } from 'weplay-singleton/RouterProvider/useHistory'

import { goTo, NAMES } from 'weplay-core/routes'

import Button, { BUTTON_PRIORITY } from 'weplay-components/Button'

import EmptyState from 'weplay-competitive/components/EmptyState'
import WrapperOverflowX from 'weplay-competitive/components/WrapperOverflowX'
import MatchRaw from 'weplay-competitive/components/MatchRaw'
import Wrapper from 'weplay-competitive/components/Wrapper'
import Section from 'weplay-competitive/components/Section'
import { matchesSelectors } from 'weplay-competitive/reduxs/matches'
import { MAX_MATCHES } from 'weplay-competitive/pages/MemberPage/consts'
import useDiscipline from 'weplay-competitive/hooks/useDiscipline'

import styles from './MatchesSection.scss'

const MatchesSection = ({
  matchesIds,
  isOwner,
  amountMatches,
}) => {
  const t = useTranslation()
  const params = useParams()
  const { discipline } = useDiscipline()
  const history = useHistory()

  const matches = useSelector(matchesSelectors.createRecordsByIdsSelector(matchesIds))

  const handleClickMoreMatches = useCallback(
    () => goTo({
      name: NAMES.MEMBER_MATCHES,
      history,
      params,
    }),
    [history, params],
  )

  return (
    <Section
      id="matchesSection"
      title={t('competitive.member.matchesSection.title')}
      subtitle={t('competitive.member.matchesSection.subTitle')}
      containerClassName={matches.length ? styles.container : null}
    >
      {matches.length
        ? (
          <WrapperOverflowX>
            <div data-event-amplitude-source="User profile">
              <MatchRaw
                matches={matches}
                discipline={discipline}
              />
            </div>
          </WrapperOverflowX>
        )
        : (
          <EmptyState
            text={isOwner
              ? t('competitive.member.emptyText.noMatchesOwner')
              : t('competitive.member.emptyText.noMatches')}
            avatar=""
            textButton=""
            isHorizontal
          />
        )}
      {amountMatches > MAX_MATCHES && (
      <Wrapper>
        <Button
          priority={BUTTON_PRIORITY.SECONDARY}
          onClick={handleClickMoreMatches}
          className={styles.showMore}
        >
          {t('competitive.member.matchesSection.showAll')}
        </Button>
      </Wrapper>
      )}
    </Section>
  )
}

MatchesSection.propTypes = {
  isOwner: PropTypes.bool.isRequired,
  matchesIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  amountMatches: PropTypes.number.isRequired,
}

export default MatchesSection
