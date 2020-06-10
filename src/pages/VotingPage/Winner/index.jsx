import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import SectionBody from 'weplay-components/SectionBody'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'

import Candidate from '../Candidates/Candidate'

import styles from './styles.scss'
import container from './container'

const Winner = ({
  i18nTexts,
  candidate,
  playerFeedback,
  editorFeedback,
}) => (
  <SectionBody>
    <ContentContainer>
      <div className={styles.wrapper}>
        <div className={styles.winnerBlock}>
          <Candidate
            i18n={i18nTexts}
            candidate={candidate}
          />
        </div>
        <div className={styles.winnerDescription}>
          <div className={styles.contentBlock}>
            <p className={styles.title}>{i18nTexts.voting.winner.gamerTitle}</p>
            <p className={classNames(
              styles.description,
              'u-text-medium',
            )}
            >
              {playerFeedback}
            </p>
          </div>
          <div className={styles.contentBlock}>
            <p className={styles.title}>{i18nTexts.voting.winner.editorTitle}</p>
            <p className={styles.description}>
              {editorFeedback}
            </p>
          </div>
        </div>
      </div>
    </ContentContainer>
  </SectionBody>
)

Winner.propTypes = {
  i18nTexts: PropTypes.shape({}).isRequired,
  candidate: PropTypes.shape({
    id: PropTypes.number.isRequired,
    votingId: PropTypes.number.isRequired,
    pictureUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    votesCount: PropTypes.number.isRequired,
    nextVoteDatetime: PropTypes.string,
    callerCanVote: PropTypes.bool.isRequired,
    description: PropTypes.string,
  }).isRequired,

  playerFeedback: PropTypes.string,
  editorFeedback: PropTypes.string,
}

Winner.defaultProps = {
  playerFeedback: '',
  editorFeedback: '',
}

export default container(Winner)
