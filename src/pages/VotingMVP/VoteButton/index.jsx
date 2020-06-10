import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Button, { BUTTON_SIZE, BUTTON_COLOR } from 'weplay-components/Button'
import CopyLink from 'weplay-components/CopyLink/loadable'
import Icon from 'weplay-components/Icon'
import DropDown from 'weplay-events/components/DropDown'
import Rules from 'weplay-events/components/Rules'
import countdownPropType from 'weplay-core/customPropTypes/countdownPropType'

import styles from './styles.scss'
import container from './container'

const VoteButton = ({
  // required props
  candidate,
  i18nTexts,
  modifiers,
  voteRules,
  tournamentTitle,
  handleClick,

  // container props
  countdown,
  // optional props
  isVotingFinished,
  copyLink,
}) => (
  <div
    className={classNames(
      styles.block,
      { [styles.voted]: countdown.isPassed },
      { [styles.votingFinished]: isVotingFinished },
    )}
  >
    {isVotingFinished ? (
      <>
        <Icon
          iconName="heart"
          className={styles.svgIcon}
        />

        <p className={styles.number}>
          {candidate.votesCount}
          <span className={styles.votes}>
            {i18nTexts.votingMVP.voteBtn.votes}
          </span>
        </p>
      </>
    ) : (countdown.isPassed && (
      <>
        <Button
          className={styles.button}
          color={BUTTON_COLOR.CTA}
          size={BUTTON_SIZE.SM}
          onClick={handleClick}
        >
          {i18nTexts.votingMVP.voteBtn.btn}
        </Button>

        <div className={styles.wrapDropDown}>
          <DropDown
            label={i18nTexts.votingMVP.matchDetailsTooltip}
            modifiers={modifiers}
            tournamentTitle={tournamentTitle}
            iconName="info"
          >
            <Rules
              prizeListRules={voteRules}
              tournamentTitle={tournamentTitle}
            />
          </DropDown>
        </div>
      </>
    ))}

    {!countdown.isPassed && (
      <>
        <CopyLink
          text={copyLink}
          tooltipIcon="check"
        >
          <span className="u-text-medium">
            {i18nTexts.voting.candidates.copy}
          </span>
        </CopyLink>

        <p className={styles.text}>
          {i18nTexts.votingMVP.voteBtn.text}
          <span className={styles.time}>
            {`${countdown.hours}:${countdown.minutes}:${countdown.seconds}`}
          </span>
        </p>
      </>
    )}
  </div>

)

VoteButton.propTypes = {
  // required props
  candidate: PropTypes.shape({
    votesCount: PropTypes.number,
  }).isRequired,
  i18nTexts: PropTypes.shape({}).isRequired,
  voteRules: PropTypes.arrayOf(PropTypes.string).isRequired,
  tournamentTitle: PropTypes.string.isRequired,
  modifiers: PropTypes.arrayOf(PropTypes.string),
  handleClick: PropTypes.func.isRequired,

  // container props
  countdown: countdownPropType.isRequired,
  // optional props
  isVotingFinished: PropTypes.bool,
  copyLink: PropTypes.string,
}

VoteButton.defaultProps = {
  // optional props
  modifiers: [],
  isVotingFinished: false,
  copyLink: '',
}

export default container(VoteButton)
