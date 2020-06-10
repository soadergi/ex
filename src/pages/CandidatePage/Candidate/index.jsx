import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import UserAvatarLegacy from 'weplay-components/UserAvatarLegacy'
import Icon from 'weplay-components/Icon'
import Tabs from 'weplay-components/Tabs'
import VoteButton from 'weplay-components/VoteButton'

import Tab from './Tab'
import Essay from './Essay'
import Video from './Video'
import container from './container'
import styles from './styles.scss'

const Candidate = ({
  i18nTexts,
  handleClose,
  votingOption,
  votingOptionCountry,
  tabs,
  setActiveTab,
  activeTab,
  isEditorPick,
}) => (
  <div className={styles.candidate}>
    <div className={styles.aside}>
      <UserAvatarLegacy
        avatar={votingOption.pictureUrl}
        className={styles.avatar}
      />
      <p className={styles.info}>{`${i18nTexts.voting.essay.age}: ${votingOption.age}`}</p>
      <p className={styles.info}>{`${i18nTexts.voting.essay.country}: ${votingOptionCountry}`}</p>

      {!isEditorPick && (
        <p className={styles.votes}>
          {votingOption.votesCount}
          {i18nTexts.voting.candidates.votes}
        </p>
      )}
    </div>

    <div className={styles.container}>
      <div className={styles.contentHeader}>
        <UserAvatarLegacy
          avatar={votingOption.pictureUrl}
          className={classNames(
            styles.avatar,
            'u-mr-3',
          )}
        />

        <div className={styles.userWrapper}>
          <p className={styles.name}>{votingOption.title}</p>
          <p className={styles.info}>
            <span className={classNames(
              styles.info,
              'u-mr-1',
            )}
            >
              {`${i18nTexts.voting.essay.country}: ${votingOptionCountry}`}
            </span>
            {`${i18nTexts.voting.essay.age}: ${votingOption.age}`}
          </p>
          <div className="u-flex u-justify-start u-align-items-center">
            <VoteButton
              votingOptionId={votingOption.id}
              votingId={votingOption.votingId}
              className="u-mr-2"
              hideTextWhenCountDown
            />
            <p className={styles.votes}>
              {votingOption.votesCount}
              {i18nTexts.voting.candidates.votes}
            </p>
          </div>
        </div>
      </div>

      <div className={classNames(
        styles.tabs,
        styles.headerTabs,
      )}
      >
        {!R.isNil(votingOption.videoUrl) && (
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            TabComponent={Tab}

            onChange={setActiveTab}
          />
        )}
      </div>
      <div className={classNames(
        styles.header,
      )}
      >
        <p className={styles.name}>{votingOption.title}</p>
        <div className={styles.tabs}>
          {!R.isNil(votingOption.videoUrl) && (
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              TabComponent={Tab}

              onChange={setActiveTab}
            />
          )}
        </div>
      </div>
      <div className={styles.wrapper}>
        {R.isNil(votingOption.videoUrl)
          ? <Essay description={votingOption.description} />
          : (
            <>
              {activeTab.id === 'essay' && <Essay description={votingOption.description} />}
              {activeTab.id === 'video' && <Video videoUrl={votingOption.videoUrl} />}
            </>
          )}
      </div>
    </div>

    <button
      type="button"
      className={styles.close}
      onClick={handleClose}
    >
      <Icon
        className={styles.closeIcon}
        iconName="close"
      />
    </button>
  </div>
)

Candidate.propTypes = {
  i18nTexts: PropTypes.shape({}).isRequired,
  handleClose: PropTypes.func.isRequired,
  votingOption: PropTypes.shape({
    pictureUrl: PropTypes.string.isRequired,
    age: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    votingId: PropTypes.string.isRequired,
    votesCount: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    videoUrl: PropTypes.string.isRequired,
  }).isRequired,
  tabs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
  setActiveTab: PropTypes.func.isRequired,
  activeTab: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  votingOptionCountry: PropTypes.string.isRequired,

  isEditorPick: PropTypes.bool,
}

Candidate.defaultProps = {
  isEditorPick: false,
}

export default container(Candidate)
