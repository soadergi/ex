import React from 'react'
import PropTypes from 'prop-types'

import ContentContainer from 'weplay-components/_wrappers/ContentContainer'

import votingPropType from 'customPropTypes/votingPropType'

import Period from '../Period'
import { VOTING_STATUSES } from '../consts'

import votingBg from './img/voting-bg.jpg'
import TopWinner from './TopWinner'
import container from './container'
import styles from './styles.scss'

const style = { backgroundImage: `url(${votingBg})` }
const TopScreen = ({
  i18n,
  status,
  voting,
  candidate,
}) => (
  <div
    className={styles.block}
    style={style}
  >
    <div className={styles.content}>
      <ContentContainer>
        <h2 className={styles.title}>
          { status === VOTING_STATUSES.FINISHED
            ? i18n.voting.mainBanner.stages.FINISHED.title
            : i18n.voting.mainBanner.title}
          <span className={styles.description}>
            {status === VOTING_STATUSES.FINISHED
              ? i18n.voting.mainBanner.stages.FINISHED.text
              : i18n.voting.mainBanner.titleColor}
          </span>
        </h2>

        {status !== VOTING_STATUSES.FINISHED && (
          <>
            <p className={styles.lead}>
              {i18n.voting.mainBanner.text}
            </p>

            <p className={styles.subtitle}>
              {i18n.voting.timeLeft}
            </p>
          </>
        )}

        <>
          {status === VOTING_STATUSES.NOT_STARTED && (
            <Period
              i18n={i18n}
              startDatetime={voting.startDatetime}
              finishDatetime={voting.finishDatetime}
            />
          )}
        </>

        <TopWinner
          candidate={candidate}
        />

      </ContentContainer>
    </div>
  </div>
)

TopScreen.propTypes = {
  status: PropTypes.string.isRequired,
  voting: votingPropType.isRequired,
  candidate: PropTypes.shape({}).isRequired,
  i18n: PropTypes.shape({
    voting: PropTypes.shape({
      mainBanner: PropTypes.shape({
        stages: PropTypes.shape({
          FINISHED: PropTypes.string.isRequired,
        }).isRequired,
        title: PropTypes.string.isRequired,
        titleColor: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      }).isRequired,
      timeLeft: PropTypes.string.isRequired,
      startDatetime: PropTypes.string.isRequired,
      finishDatetime: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

TopScreen.defaultProps = {
}

export default container(TopScreen)
