import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { useParams } from 'weplay-singleton/RouterProvider/useParams'

import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'
import transliterate from 'weplay-core/helpers/translit'

import Link from 'weplay-components/Link'

import { memberInfoSelectors } from 'weplay-competitive/reduxs/memberInfoV3'
import PlayerAvatar from 'weplay-competitive/components/PlayerAvatar'

import MatchMemberSkeleton from './MatchMemberSkeleton'
import styles from './MatchMember.scss'

const MatchMember = ({
  memberId,
}) => {
  const member = useSelector(memberInfoSelectors.createRecordByIdSelector(memberId))

  const { discipline } = useParams()

  // TODO: @rbogdanov update click handler if need
  const handleLinkClick = () => {}

  if (!member.isFetched) {
    return <MatchMemberSkeleton />
  }
  return member.isFetched && (
    <>
      <Link
        to={pathWithParamsByRoute(
          NAMES.MEMBER,
          {
            memberId: member.id,
            memberName: transliterate(member.nickname),
            discipline,
          },
        )}
        onClick={handleLinkClick}
        target="_blank"
        className={styles.wrapper}
      >
        <PlayerAvatar
          size="128"
          isPlaceholderDark
          id={memberId}
        />
        <p className={styles.name}>
          {member.nickname}
        </p>
      </Link>
    </>
  )
}

MatchMember.propTypes = {
  memberId: PropTypes.number.isRequired,
}

MatchMember.defaultProps = {
  // optional props
}

export default MatchMember
