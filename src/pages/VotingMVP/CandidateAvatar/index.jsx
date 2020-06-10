import React from 'react'
import UserAvatarLegacy from 'weplay-components/UserAvatarLegacy'
import PropTypes from 'prop-types'
import { SocialLinksMarkup } from 'weplay-components/SocialLinks'

import styles from './styles.scss'
import container from './container'

const userAvatarLgModifiers = ['lg', 'dark-blue-bg']
const SocialLinksModifiers = ['teamMember', 'voteMVP']

const CandidateAvatar = ({
  // required props

  // container props
  candidate,
  socials,
  liquipedia,

  // optional props
}) => (
  <div className={styles.block}>
    <UserAvatarLegacy
      className={styles.avatar}
      avatar={candidate.extra.avatarUrl}
      modifiers={userAvatarLgModifiers}
    />

    <div className={styles.wrapInfo}>
      <p className={styles.nickName}>{candidate.extra.nickname}</p>
      <p className={styles.name}>{candidate.extra.fullName}</p>
      <SocialLinksMarkup
        className={styles.links}
        liquipedia={liquipedia}
        links={socials}
        modifiers={SocialLinksModifiers}
      />
    </div>
  </div>

)

CandidateAvatar.propTypes = {
  // required props
  candidate: PropTypes.shape({
    extra: PropTypes.shape({
      avatarUrl: PropTypes.string,
      nickname: PropTypes.string,
      fullName: PropTypes.string,
    }),
  }).isRequired,
  socials: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
  liquipedia: PropTypes.bool.isRequired,

  // container props

  // optional props
}

CandidateAvatar.defaultProps = {
  // optional props
}

export default container(CandidateAvatar)
