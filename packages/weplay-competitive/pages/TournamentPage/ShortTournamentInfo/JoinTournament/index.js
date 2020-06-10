import React from 'react'
import PropTypes from 'prop-types'
import { NavHashLink } from 'react-router-hash-link'

import Tip from 'weplay-components/Tip'
import Button, { BUTTON_COLOR, BUTTON_PRIORITY } from 'weplay-components/Button'

import tournamentPropType from 'weplay-competitive/customPropTypes/tournamentPropType'
import { TOURNAMENT_STATUSES } from 'weplay-competitive/constants/tournamentStatuses'

import styles from '../styles.scss'

import TipsBlock from './TipsBlock'
import container from './container'

const JoinTournament = ({
  // required props
  isCurrentMemberInTournament,
  disableJoinBtn,
  tipType,
  currentTournament,
  handlerJoinTournament,
  regWillBeClosed,

  // container props
  handleSeeBracketClick,
  scrollToBrackets,
  isPremiumTournament,
  t,
  // optional props
}) => (
  <div className={styles.bottomButton}>
    {isCurrentMemberInTournament && currentTournament.status === TOURNAMENT_STATUSES.UPCOMING
      ? (
        <>
          <Button
            color={BUTTON_COLOR.DANGER}
            priority={BUTTON_PRIORITY.SECONDARY}
            className={styles.button}
            onClick={handlerJoinTournament}
            disabled={disableJoinBtn}
          >
            {t('competitive.tournament.info.leave')}
          </Button>
          {tipType && (
            <Tip
              className={styles.tip}
              isWarning
            >
              {t(`competitive.tournament.tips.${tipType}`)}
            </Tip>
          )}
        </>
      )
      : (
        <>
          {currentTournament.status === TOURNAMENT_STATUSES.UPCOMING ? (
            <>
              {isPremiumTournament && (
              <Button
                color={BUTTON_COLOR.GOLD}
                className={styles.button}
                onClick={handlerJoinTournament}
                disabled={disableJoinBtn}
              >
                {t('competitive.tournament.info.join')}
              </Button>
              )}

              {!isPremiumTournament && (
              <Button
                color={BUTTON_COLOR.CTA}
                className={styles.button}
                onClick={handlerJoinTournament}
                disabled={disableJoinBtn}
              >
                {t('competitive.tournament.info.join')}
              </Button>
              )}
            </>
          )
            : (
              <NavHashLink
                to="#bracketsSection"
                scroll={scrollToBrackets}
                className={styles.buttonScrollTo}
                onClick={handleSeeBracketClick}
              >
                {t('competitive.tournament.info.seeBracket')}
              </NavHashLink>
            )}
          <TipsBlock
            tipType={tipType}
            currentTournament={currentTournament}
            regWillBeClosed={regWillBeClosed}
          />
        </>
      )}
  </div>
)

JoinTournament.propTypes = {
  // required props
  currentTournament: tournamentPropType.isRequired,
  isCurrentMemberInTournament: PropTypes.bool.isRequired,
  handlerJoinTournament: PropTypes.func.isRequired,
  tipType: PropTypes.string.isRequired,
  disableJoinBtn: PropTypes.bool.isRequired,
  // container props
  regWillBeClosed: PropTypes.bool.isRequired,
  isPremiumTournament: PropTypes.bool.isRequired,
  handleSeeBracketClick: PropTypes.func.isRequired,
  scrollToBrackets: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  // optional props
}

JoinTournament.defaultProps = {
  // optional props
}

export default container(JoinTournament)
