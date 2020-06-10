import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Wrapper from 'weplay-competitive/components/Wrapper'
import lobbyMapPropType from 'weplay-competitive/customPropTypes/lobbyMapPropType'

import MatchCountDown from '../MatchCountDown'

import container from './container'
import styles from './styles.scss'
import VotingPool from './VotingPool'

const VotingInfo = ({
  // required props
  isCountDownShown,
  votingStartDatetime,
  // container props
  homeParticipantMaps,
  awayParticipantMaps,
  serverMaps,
  isMapPoolSizeMoreThanOne,
  coinMemberId,
  homeParticipantId,
  awayParticipantId,
  showServerPick,
  // optional props
}) => (
  <div
    className={classNames(
      styles.block,
    )}
  >
    <Wrapper className={classNames(
      styles.wrapper,
      {
        [styles.isCountDownShown]: isCountDownShown,
      },
    )}
    >
      <div className={styles.countdown}>
        {isCountDownShown
          ? (
            <MatchCountDown votingStartDatetime={votingStartDatetime} />
          )
          : (
            <div className="u-text-center">
              {showServerPick && (
              <VotingPool
                isServer
                lobbyMaps={serverMaps}
              />
              )}
            </div>
          )}
      </div>
      {isMapPoolSizeMoreThanOne && (
      <Fragment>
        <div className={classNames(
          styles.user,
          styles.first,
        )}
        >
          <VotingPool
            lobbyMaps={homeParticipantMaps}
            hasCoin={homeParticipantId === coinMemberId}
          />
        </div>
        <div className={classNames(
          styles.user,
          styles.second,
        )}
        >
          <VotingPool
            isReverse
            lobbyMaps={awayParticipantMaps}
            hasCoin={awayParticipantId === coinMemberId}
          />
        </div>
      </Fragment>
      )}
    </Wrapper>
  </div>

)

VotingInfo.propTypes = {
  // required props
  isCountDownShown: PropTypes.bool.isRequired,
  // container props
  isMapPoolSizeMoreThanOne: PropTypes.bool.isRequired,
  showServerPick: PropTypes.bool.isRequired,
  // optional props
  votingStartDatetime: PropTypes.shape({}),
  homeParticipantMaps: PropTypes.arrayOf(lobbyMapPropType),
  awayParticipantMaps: PropTypes.arrayOf(lobbyMapPropType),
  serverMaps: PropTypes.arrayOf(lobbyMapPropType),
  coinMemberId: PropTypes.number,
  homeParticipantId: PropTypes.number,
  awayParticipantId: PropTypes.number,
}

VotingInfo.defaultProps = {
  // optional props
  votingStartDatetime: null,
  homeParticipantMaps: [],
  awayParticipantMaps: [],
  serverMaps: null,
  coinMemberId: null,
  homeParticipantId: null,
  awayParticipantId: null,
}

export default container(VotingInfo)
