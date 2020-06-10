import React, { useMemo } from 'react'

import Icon from 'weplay-components/Icon'

import MMMatchPropType from 'weplay-competitive/customPropTypes/MMMatchPropType'

import styles from './MatchScore.scss'

const MatchScore = ({
  match,
}) => {
  const {
    teamLeft: [memberLeft],
    teamRight: [memberRight],
    winnerId,
  } = useMemo(
    () => match,
    [match],
  )
  return (
    <>
      <div className={styles.container}>
        <span className={styles.score}>
          <span className={styles.wrapper}>
            {match?.scoreLeft ?? 0}
            {memberLeft.id === winnerId && (
              <Icon
                className={styles.winner}
                iconName="tournamentsCup"
              />
            )}
          </span>
        </span>
        <Icon
          className={styles.icon}
          iconName="halfMainLogo"
        />
        <span className={styles.score}>
          <span className={styles.wrapper}>
            {match?.scoreRight ?? 0}
            {memberRight.id === winnerId && (
              <Icon
                className={styles.winner}
                iconName="tournamentsCup"
              />
            )}
          </span>
        </span>
      </div>
    </>
  )
}

MatchScore.propTypes = {
  // required props

  // container props
  match: MMMatchPropType.isRequired,

  // optional props
}

MatchScore.defaultProps = {
  // optional props
}

export default React.memo(MatchScore)
