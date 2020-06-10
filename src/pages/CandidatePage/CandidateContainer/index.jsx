import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import SvgIcon from 'weplay-components/SvgIcon'

import Candidate from '../Candidate'

import container from './container'
import styles from './styles.scss'

const CandidateContainer = ({
  i18nTexts,
  handleClose,
  votingOptionId,
  onPrevClick,
  onNextClick,
}) => (
  <div className={styles.container}>
    <button
      type="button"
      onClick={onPrevClick}
      className={classNames(
        [styles.button],
        [styles.buttonLeft],
      )}
    >
      <SvgIcon
        iconName="arrow"
        className={styles.icon}
      />
    </button>

    <div className={styles.content}>
      <Candidate
        i18nTexts={i18nTexts}
        handleClose={handleClose}
        votingOptionId={votingOptionId}
        isEditorPick={votingOptionId === 21} // TODO: WARNING!!! votingOptionId hardcoded!!!
      />
    </div>

    <button
      type="button"
      onClick={onNextClick}
      className={classNames(
        [styles.button],
        [styles.buttonRight],
      )}
    >
      <SvgIcon
        iconName="arrow"
        className={styles.icon}
      />
    </button>
  </div>
)

CandidateContainer.propTypes = {
  i18nTexts: PropTypes.shape({}).isRequired,
  handleClose: PropTypes.func.isRequired,
  votingOptionId: PropTypes.number.isRequired,
  onPrevClick: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired,
  nearbyOptionIds: PropTypes.shape({
    prevOptionId: PropTypes.number,
    nextOptionId: PropTypes.number,
  }).isRequired,
}

export default container(CandidateContainer)
