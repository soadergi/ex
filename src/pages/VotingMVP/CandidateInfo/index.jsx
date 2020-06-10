import React from 'react'
import PropTypes from 'prop-types'
import UserAvatarLegacy from 'weplay-components/UserAvatarLegacy'
import Icon from 'weplay-components/Icon'
import imgPropType from 'weplay-core/customPropTypes/imgPropType'

import container from './container'
import styles from './styles.scss'

const userAvatarSizeModifiers = ['extra-sm']

const CandidateInfo = ({
  // required props
  i18nTexts,
  candidate,

  // container props
  avatar,
  kda,
  winRate,
  // optional props
}) => (
  <div className={styles.block}>
    <div className={styles.info}>
      <div className={styles.header}>
        <Icon
          iconName="sword"
          className={styles.svgIcon}
        />
        <p className={styles.headerText}>{i18nTexts.votingMVP.candidateInfo.stats}</p>
      </div>
      <p className={styles.footerText}>{kda}</p>
    </div>

    <div className={styles.info}>
      <div className={styles.header}>
        <Icon
          iconName="graph"
          className={styles.svgIcon}
        />
        <p className={styles.headerText}>{i18nTexts.votingMVP.candidateInfo.text}</p>
      </div>
      <p className={styles.footerText}>
        {`${winRate}%`}
      </p>
    </div>

    <div className={styles.info}>
      <div className={styles.header}>
        <Icon
          iconName="team"
          className={styles.svgIcon}
        />
        <p className={styles.headerText}>{i18nTexts.votingMVP.candidateInfo.team}</p>
      </div>
      <div className={styles.footer}>
        <UserAvatarLegacy
          avatar={avatar}
          className={styles.teamLogo}
          modifiers={userAvatarSizeModifiers}
        />
        <p className={styles.footerText}>
          {candidate.extra.teamName}
        </p>
      </div>
    </div>

  </div>

)

CandidateInfo.propTypes = {
  // required props
  i18nTexts: PropTypes.shape({}).isRequired,
  candidate: PropTypes.shape({
    extra: PropTypes.shape({
      teamName: PropTypes.string.isRequired,
    }),
  }).isRequired,

  // container props
  avatar: imgPropType.isRequired,
  kda: PropTypes.string.isRequired,
  winRate: PropTypes.string.isRequired,
  // optional props
}

CandidateInfo.defaultProps = {
  // optional props
}

export default container(CandidateInfo)
