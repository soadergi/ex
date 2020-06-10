import React from 'react'
import PropTypes from 'prop-types'

import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import SectionBody from 'weplay-components/SectionBody'
import SectionHeader from 'weplay-components/SectionHeader'

import Candidate from './Candidate'
import TopCandidate from './TopCandidate'
import FilterButton from './FilterButton'
import container from './container'
import styles from './styles.scss'

const three = 3
const modifiers = ['lightGreyBg']
const Candidates = ({
  i18nTexts,
  candidates,
  onVote,
  toggleCandidates,
  isTopThreeCandidates,
  firstCandidate,
}) => (
  <>
    <SectionBody
      modifiers={modifiers}
      hasPaddingBottom={false}
    >
      <ContentContainer>
        <h2 className={styles.title}>{i18nTexts.voting.filter.title}</h2>
        <p className={styles.description}>{i18nTexts.voting.filter.description}</p>

        <div className={styles.buttonGroup}>
          <FilterButton
            buttonText={i18nTexts.voting.filter.buttonTopThree}
            handleClick={toggleCandidates}
            isActive={isTopThreeCandidates}
          />

          <FilterButton
            buttonText={i18nTexts.voting.filter.buttonTopTwenty}
            handleClick={toggleCandidates}
            isActive={!isTopThreeCandidates}
          />
        </div>
      </ContentContainer>
    </SectionBody>

    <SectionBody
      modifiers={modifiers}
    >
      <ContentContainer>
        {isTopThreeCandidates ? (
          <>
            <SectionHeader
              title={i18nTexts.voting.candidates.sectionTopTitle}
            />

            <div className={styles.wrapper}>
              <TopCandidate
                titleText={i18nTexts.voting.candidates.subtitleLeft}
                alertText={i18nTexts.voting.candidates.alertTextLeft}
              >
                <div className={styles.tile}>
                  {candidates.slice(1, three).map(candidate => (
                    <Candidate
                      candidate={candidate}
                      onVote={onVote}
                      key={candidate.id}
                    />
                  ))}
                </div>
              </TopCandidate>

              <TopCandidate
                titleText={i18nTexts.voting.candidates.subtitleRight}
                alertText={i18nTexts.voting.candidates.alertTextRight}
              >
                <div className={styles.tile}>
                  <Candidate
                    candidate={firstCandidate}
                    onVote={onVote}
                    isEditorPick
                  />
                </div>
              </TopCandidate>
            </div>
          </>
        )
          : (
            <>
              <SectionHeader
                title={i18nTexts.voting.candidates.sectionTitle}
              />

              <div className={styles.grid}>
                {candidates.slice(1).map(candidate => (
                  <div
                    className={styles.candidats}
                    key={candidate.id}
                  >
                    <Candidate
                      candidate={candidate}
                      onVote={onVote}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
      </ContentContainer>
    </SectionBody>
  </>
)

Candidates.propTypes = {
  i18nTexts: PropTypes.shape({}).isRequired,
  candidates: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  firstCandidate: PropTypes.shape({}).isRequired,
  onVote: PropTypes.func.isRequired,
  toggleCandidates: PropTypes.func.isRequired,
  isTopThreeCandidates: PropTypes.bool.isRequired,
}

export default container(Candidates)
