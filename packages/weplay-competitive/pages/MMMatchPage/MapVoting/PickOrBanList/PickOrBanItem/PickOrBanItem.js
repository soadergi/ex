import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { $propEq } from 'weplay-core/$utils/$propEq'

import useMMVoteDetails from 'weplay-competitive/hooks/MM/useMMVoteDetails'
import MMVotingSocket from 'weplay-competitive/services/MMVotingSocket'
import { currentMemberSelector } from 'weplay-competitive/reduxs/members/selectors'
import MMVoteItemPropType from 'weplay-competitive/customPropTypes/MMVoteItemPropType'
import MMVotePropType from 'weplay-competitive/customPropTypes/MMVotePropType'

import useMMPickOrBanItemStatus from './useMMPickOrBanItemStatus'
import PickOrBanItemSkeleton from './PickOrBanItemSkeleton'
import styles from './PickOrBanItem.scss'

const PickOrBanItem = ({
  voteItem,
  pickOrBanItems,
  vote,
}) => {
  const t = useTranslation()

  const currentMember = useSelector(currentMemberSelector)

  const { wasVoted, votedItemStatus } = useMMPickOrBanItemStatus({ voteItem })

  const { canCurrentMemberVote, stepName } = useMMVoteDetails({ vote })

  const pickOrBanItem = useMemo(
    () => pickOrBanItems?.find($propEq('id', voteItem.id)),
    [pickOrBanItems],
  )

  const handleVote = useCallback(() => {
    if (canCurrentMemberVote) {
      MMVotingSocket.sendVoteMapEvent({
        voteItemId: voteItem.id,
        matchId: vote.id,
        userId: currentMember.id,
      })
    }
  }, [MMVotingSocket, voteItem, vote, currentMember, canCurrentMemberVote])

  if (!pickOrBanItem) return <PickOrBanItemSkeleton />

  return (
    <button
      type="button"
      onClick={handleVote}
      className={classNames(
        styles.link,
        {
          [styles.isDisabled]: wasVoted,
          [styles.isPicked]: wasVoted && (votedItemStatus === 'PICK'),
          [styles.isBanned]: wasVoted && (votedItemStatus === 'BAN'),
          [styles.isPicking]: canCurrentMemberVote && (stepName === 'PICK'),
          [styles.isBanning]: canCurrentMemberVote && (stepName === 'BAN'),
        },
      )}
    >

      {pickOrBanItem && voteItem.status === 'NONE' && (
        <img
          src={pickOrBanItem.logo}
          alt={pickOrBanItem.name}
          className={classNames(
            styles.image,
            {
              [styles.isDisabled]: wasVoted,
            },
          )}
        />
      )}

      <div className={styles.content}>
        <span className={styles.moveState}>
          {t(`competitive.match.mapVoting.buttons.${stepName}`)}
        </span>

        <span className={classNames(
          styles.mapName,
          styles.textEllipsis,
        )}
        >
          {pickOrBanItem.name}
        </span>
      </div>
    </button>
  )
}

PickOrBanItem.propTypes = {
  pickOrBanItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      logo: PropTypes.string,
      status: PropTypes.string,
    }),
  ).isRequired,
  voteItem: MMVoteItemPropType.isRequired,
  vote: MMVotePropType.isRequired,
}

PickOrBanItem.defaultProps = {}

export default PickOrBanItem
