import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import InlineTabs from 'weplay-components/InlineTabs'
import Tab from 'weplay-components/Tab'
import PlayOff from 'weplay-events/components/EventsPlayOff'
import { playoffRoundPropType } from 'weplay-events/customPropTypes'
import tableTabsPropTypes from 'weplay-events/customPropTypes/tableTabs'

import styles from '../../styles.scss'

import container from './container'

const DireBrackets = ({
  // required props
  activeTab,
  isTournamentFinished,
  playoffRounds,
  playoff2Rounds,
  playoff3Rounds,
  playoff4Rounds,
  grandFinal,
  grandFinal2,

  // container props
  tabs,
  handleTabClick,
  // optional props
}) => (
  <Fragment>
    <InlineTabs
      isCentered
      hasSeparator
    >
      {tabs.map(tab => (
        <Tab
          key={tab.id}
          tab={tab.title}
          handleClick={handleTabClick(tab)}
          activeTab={tab.id === activeTab.id}
        />
      ))}
    </InlineTabs>

    {(activeTab.id === 'Americas') && (
    <div className={styles.bracketsWrap}>
      <div className={styles.butterflyBrackets}>
        <PlayOff
          rounds={playoffRounds}
          isTournamentFinished={isTournamentFinished}
          isWinnerBracket
          hasPlayoffConnector
          isFullBracket
        />

        <PlayOff
          rounds={grandFinal}
          isTournamentFinished={isTournamentFinished}
          isSingleRound
          isSuperFinal
          isFullBracketSuperFinal
          hasPlayoffConnector
        />

        <PlayOff
          rounds={playoff2Rounds}
          isTournamentFinished={isTournamentFinished}
          isWinnerBracket
          hasPlayoffConnector
          isFullBracket
          isReverted
        />
      </div>
    </div>
    )}

    {(activeTab.id === 'Asia') && (
    <div className={styles.bracketsWrap}>
      <div className={styles.butterflyBrackets}>
        <PlayOff
          rounds={playoff3Rounds}
          isTournamentFinished={isTournamentFinished}
          isWinnerBracket
          hasPlayoffConnector
          isFullBracket
        />

        <PlayOff
          rounds={grandFinal2}
          isTournamentFinished={isTournamentFinished}
          isSingleRound
          isSuperFinal
          isFullBracketSuperFinal
          hasPlayoffConnector
        />

        <PlayOff
          rounds={playoff4Rounds}
          isTournamentFinished={isTournamentFinished}
          isWinnerBracket
          hasPlayoffConnector
          isFullBracket
          isReverted
        />
      </div>
    </div>
    )}
  </Fragment>

)

DireBrackets.propTypes = {
  // required props
  activeTab: tableTabsPropTypes.isRequired,
  isTournamentFinished: PropTypes.bool.isRequired,
  playoffRounds: playoffRoundPropType.isRequired,
  playoff2Rounds: playoffRoundPropType.isRequired,
  playoff3Rounds: playoffRoundPropType.isRequired,
  playoff4Rounds: playoffRoundPropType.isRequired,
  grandFinal: playoffRoundPropType.isRequired,
  grandFinal2: playoffRoundPropType.isRequired,

  // container props
  tabs: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
  handleTabClick: PropTypes.func.isRequired,
  // optional props
}

DireBrackets.defaultProps = {
  // optional props
}

export default container(DireBrackets)
