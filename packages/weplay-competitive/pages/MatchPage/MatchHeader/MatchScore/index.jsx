import React from 'react'
import matchPropType from 'weplay-competitive/customPropTypes/matchPropType'
import Icon from 'weplay-components/Icon'
import container from 'weplay-competitive/pages/MatchPage/MatchHeader/MatchScore/container'

import styles from './styles.scss'

const isWinner = false

const MatchScore = ({
  // required props

  // container props
  match,

  // optional props
}) => (
  <>
    <div className={styles.container}>
      <span className={styles.score}>
        <span className={styles.wrapper}>
          {match.score1}
          {/* // TODO need state isWinner */}
          {isWinner && (
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
          {match.score2}
          {/* // TODO need state isWinner */}
          {isWinner && (
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

MatchScore.propTypes = {
  // required props

  // container props
  match: matchPropType.isRequired,

  // optional props
}

MatchScore.defaultProps = {
  // optional props
}

export default container(MatchScore)
