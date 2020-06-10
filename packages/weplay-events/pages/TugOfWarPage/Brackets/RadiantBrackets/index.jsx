import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import InlineTabs from 'weplay-components/InlineTabs'
import Tab from 'weplay-components/Tab'
import PlayOff from 'weplay-events/components/EventsPlayOff'
import Image from 'weplay-components/Image'

import backgroundUrl from '../../img/main-bg.jpg'
import styles from '../../styles.scss'

import superFinalRightSideImage from './img/super_final_right_side_image.png'
import superFinalLeftSideImage from './img/super_final_left_side_image.png'
import container from './container'

const RadiantBrackets = ({
  // required props
  activeTab,
  playoffRounds,
  isTournamentFinished,
  grandFinal,
  playoff2Rounds,

  // container props
  tabs,
  handleTabClick,
  // optional props
}) => (
  <>
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

    {(activeTab.id === 'fullBracket') && (
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

    {(activeTab.id === 'westernBracket') && (
    <div className={styles.bracketsWrap}>
      <PlayOff
        rounds={playoffRounds}
        isTournamentFinished={isTournamentFinished}
        isFullBracket
      />
    </div>
    )}

    {(activeTab.id === 'easternBracket') && (
    <div className={styles.bracketsWrap}>
      <PlayOff
        rounds={playoff2Rounds}
        isTournamentFinished={isTournamentFinished}
        isFullBracket
      />
    </div>
    )}

    {(activeTab.id === 'superFinal') && (
    <div
      className={classNames(
        styles.superFinal,
      )}
      style={{ backgroundImage: `url(${backgroundUrl}` }}
    >
      <PlayOff
        rounds={grandFinal}
        isTournamentFinished={isTournamentFinished}
        isSuperFinal
      />
      <div className={styles.superFinalImgWrap}>
        <Image
          className={styles.superFinalLeftSideImg}
          src={superFinalLeftSideImage}
          alt=""
        />
        <Image
          className={styles.superFinalRightSideImg}
          src={superFinalRightSideImage}
          alt=""
        />
      </div>
    </div>
    )}
  </>

)

RadiantBrackets.propTypes = {
  // required props
  activeTab: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  isTournamentFinished: PropTypes.bool.isRequired,
  playoffRounds: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
  })).isRequired,
  playoff2Rounds: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
  })).isRequired,
  grandFinal: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
  })).isRequired,

  // container props
  tabs: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
  handleTabClick: PropTypes.func.isRequired,
  // optional props
}

RadiantBrackets.defaultProps = {
  // optional props
}

export default container(RadiantBrackets)
