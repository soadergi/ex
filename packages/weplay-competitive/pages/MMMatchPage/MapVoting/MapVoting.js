import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import withMoment from 'weplay-core/HOCs/withMoment'

import ModalBase from 'weplay-components/ModalBase'

import CoinFlip from 'weplay-competitive/components/CoinFlip'
import useMMVoteDetails from 'weplay-competitive/hooks/MM/useMMVoteDetails'
import { useCountdown } from 'weplay-competitive/hooks/useCountdown'
import MMGameModePropType from 'weplay-competitive/customPropTypes/MMGameModePropType'
import MMVotePropType from 'weplay-competitive/customPropTypes/MMVotePropType'
import { CRITICAL_SECONDS_VALUE } from 'weplay-competitive/constants/countDown'

import styles from './MapVoting.scss'
import VotingUser from './VotingUser/VotingUser'
import Timeline from './Timeline/Timeline'
import PickOrBanList from './PickOrBanList/PickOrBanList'

const modalModifiers = ['paddingLess']
const background = {
  // eslint-disable-next-line max-len
  backgroundImage: "url('https://static-prod.weplay.tv/2020-03-16/0b6e4a36dcf2276ef79220e01f9f4908.11182C-434046-333C46.jpeg')",
}

const MapVoting = ({
  gameMode,
  vote,
  moment,
}) => {
  const t = useTranslation()

  const pickOrBanItems = gameMode?.voteItems
  const {
    teamLeft: [leftMemberId],
    teamRight: [rightMemberId],
    period,
    voteItems,
    currentVoteStepStartDate,
  } = vote

  const { stepName, votingMemberId } = useMMVoteDetails({ vote })

  const finishVoteDatetime = useMemo(
    () => moment(currentVoteStepStartDate).add(period, 's'),
    [currentVoteStepStartDate, period, moment],
  )

  const {
    isPassed,
    minutes,
    seconds,
    secondsTotal,
  } = useCountdown(finishVoteDatetime)

  return (
    <ModalBase
      isShown
      modifiers={modalModifiers}
    >
      <div
        className={styles.block}
        style={background}
      >
        <div className={styles.header}>
          <span>
            <CoinFlip />
          </span>
        </div>

        <div className={styles.body}>
          <VotingUser
            stepName={stepName}
            memberId={leftMemberId}
            votingMemberId={votingMemberId}
            minutes={minutes}
            seconds={seconds}
            voteDuration={period}
          />

          <div className={styles.timer}>
            <p className={styles.timerTitle}>
              {t('competitive.match.mapVoting.timer')}
            </p>
            <p className={classNames(
              styles.countdown,
              {
                [styles.warning]: secondsTotal < CRITICAL_SECONDS_VALUE,
              },
            )}
            >
              {!isPassed && (
              <span>
                {`${minutes}:${seconds}`}
              </span>
              )}
            </p>
          </div>
          <VotingUser
            stepName={stepName}
            memberId={rightMemberId}
            votingMemberId={votingMemberId}
            minutes={minutes}
            seconds={seconds}
            voteDuration={period}
          />
        </div>

        <Timeline vote={vote} />

        {voteItems && (
        <PickOrBanList
          vote={vote}
          pickOrBanItems={pickOrBanItems}
        />
        )}
      </div>
    </ModalBase>
  )
}

MapVoting.propTypes = {
  gameMode: MMGameModePropType.isRequired,
  moment: PropTypes.func.isRequired,
  vote: MMVotePropType.isRequired,
}

MapVoting.defaultProps = {

}

export default withMoment(MapVoting)
