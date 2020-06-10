import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'

import MainWinners from 'weplay-events/components/HeroSection/Body/MainWinners'
import DefaultEventDuration from 'weplay-events/components/HeroSection/Header/EventDuration'
import DropDown from 'weplay-events/components/DropDown'
import Rules from 'weplay-events/components/Rules'

import container from './container'
import styles from './styles.scss'

const dateFormat = {
  start: 'DD MMMM',
  end: 'DD MMMM',
}

const HeroSectionVote = ({
  i18nTexts,
  isVotingFinished,
  mainWinner,
  tournamentTitle,
  showWinnersList,
  isLanWinner,
  backgroundDevice,
  modifiers,
  rewardRules,
  votesCount,
  title,
  description,
  tournamentDates,
  prize,
}) => (
  <div className={styles.block}>

    <div
      className={styles.backgroundUrl}
      style={{ backgroundImage: `url(${backgroundDevice}` }}
    />

    <div className={styles.container}>

      <div className={styles.content}>

        {!isVotingFinished && (
          <h3 className={styles.votesCountDescription}>
            <span className={styles.votesCountNumber}>{votesCount}</span>
            {i18nTexts.votingMVP.heroSection.votesCountDescription}
          </h3>
        )}

        <span className={styles.title}>
          {title}
        </span>
        <p className={styles.description}>
          {description}
        </p>
      </div>

      {isVotingFinished
        ? (
          <MainWinners
            tournamentTitle={tournamentTitle}
            winner={mainWinner}
            label={i18nTexts.forgeOfMastersLan.heroSection.winner.winnerLabelFirst}
            showWinnersListHandler={showWinnersList}
            labelIconName="invite"
            isLanWinner={isLanWinner}
          />
        )
        : (
          <div className={styles.wrap}>
            {tournamentDates && (
            <p className={styles.data}>
              <DefaultEventDuration
                tournamentDates={tournamentDates}
                dateFormat={dateFormat}
              />
            </p>
            )}

            <p className={styles.text}>{i18nTexts.votingMVP.heroSection.reward}</p>

            <div className={styles.firstPlacePrize}>
              <p className={styles.sumWrap}>
                {`${prize}$`}
              </p>
            </div>

            {!R.isEmpty(rewardRules) && (
              <div className={styles.wrapDropDown}>
                <DropDown
                  label={i18nTexts.votingMVP.heroSection.matchDetailsButton}
                  modifiers={modifiers}
                  iconName="arrow"
                >
                  <Rules
                    prizeListRules={rewardRules}
                    tournamentTitle={tournamentTitle}
                  />

                </DropDown>
              </div>
            )}
          </div>
        )}
    </div>
  </div>
)

HeroSectionVote.propTypes = {
  // required props
  modifiers: PropTypes.arrayOf(PropTypes.string),
  rewardRules: PropTypes.arrayOf(PropTypes.string).isRequired,

  // container props
  i18nTexts: PropTypes.shape({}).isRequired,
  isVotingFinished: PropTypes.bool.isRequired,
  mainWinner: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.shape({}),
  ]).isRequired,
  tournamentTitle: PropTypes.string.isRequired,
  showWinnersList: PropTypes.func.isRequired,
  backgroundDevice: PropTypes.string.isRequired,
  isLanWinner: PropTypes.bool,
  votesCount: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tournamentDates: PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.string,
  }).isRequired,
  prize: PropTypes.string.isRequired,

  // optional props
}

HeroSectionVote.defaultProps = {
  modifiers: [],
  isLanWinner: false,
}

export default container(HeroSectionVote)
