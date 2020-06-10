import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Link from 'weplay-components/Link'
import Icon from 'weplay-components/Icon'
import CopyLink from 'weplay-components/CopyLink/loadable'

import { createMMMatchMembersSelector } from 'weplay-competitive/reduxs/commonSelectors/MM/matches'
import { currentMemberSelector } from 'weplay-competitive/reduxs/members/selectors'

import useMMPlayButton from './useMMPlayButton'
import styles from './PlayButton.scss'

const PlayButton = ({
  matchId,
  joinMatchLink,
}) => {
  const matchMembers = useSelector(createMMMatchMembersSelector(matchId))
  const currentMember = useSelector(currentMemberSelector)
  const t = useTranslation()

  const {
    buttonText,
    buttonLink,
  } = useMMPlayButton({
    matchId,
    joinMatchLink,
  })

  const isMatchMember = matchMembers.includes(currentMember?.id)

  return (
    <div className={styles.wrapper}>
      <Link
        className={classNames(
          styles.button,
          {
            [styles.isDisabled]: !isMatchMember || !buttonLink,
          },
        )}
        to={buttonLink}
      >
        <span className={styles.text}>
          {t(`competitive.match.mainButton.${buttonText}`)}
        </span>
      </Link>

      {(isMatchMember && joinMatchLink) && (
        <div className={styles.copyLink}>
          <CopyLink
            text={`connect ${joinMatchLink}`}
            className={styles.block}
            tooltipIcon="check"
          >
            <span className={styles.text}>
              {`connect ${joinMatchLink}`}
              <Icon
                className={styles.icon}
                iconName="link"
              />
            </span>
          </CopyLink>
        </div>
      )}
    </div>
  )
}

PlayButton.propTypes = {
  matchId: PropTypes.number.isRequired,
  joinMatchLink: PropTypes.string,
}

PlayButton.defaultProps = {
  joinMatchLink: '',
  // optional props
}

export default React.memo(PlayButton)
