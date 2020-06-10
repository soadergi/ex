import React from 'react'
import PropTypes from 'prop-types'

import ShareBlock from 'weplay-components/ShareBlock/ShareBlock'

import ReminderButton from 'weplay-events/components/ReminderButton'
import DownloadTicketButton from 'weplay-events/components/DownloadTicketButton'
import OpenVoteButton from 'weplay-events/components/OpenVoteButton'

import styles from './styles.scss'

const ButtonsBlock = ({
  url,
  modalTitle,
  color,
  subscriptionScopeId,
  withDownloadTicketButton,
  hint,
  hasVotingButton,
  toggleVotingCandidatesVisible,
  isOpened,
}) => (
  <div className={styles.block}>
    {hint && <p className={styles.hint}>{hint}</p>}

    {hasVotingButton && (
      <OpenVoteButton
        className={styles.button}
        toggleVotingCandidatesVisible={toggleVotingCandidatesVisible}
        isOpened={isOpened}
      />
    )}

    {subscriptionScopeId && (
      <ReminderButton
        className={styles.button}
        modalTitle={modalTitle}
        subscriptionScopeId={subscriptionScopeId}
      />
    )}

    {withDownloadTicketButton && <DownloadTicketButton />}

    <ShareBlock
      className={styles.share}
      color={color}
      url={url}
    />
  </div>
)

ButtonsBlock.propTypes = {
  subscriptionScopeId: PropTypes.string,
  toggleVotingCandidatesVisible: PropTypes.func,

  // optional props
  url: PropTypes.string,
  hasVotingButton: PropTypes.bool,
  modalTitle: PropTypes.string,
  color: PropTypes.string,
  withDownloadTicketButton: PropTypes.bool,
  hint: PropTypes.string,
  isOpened: PropTypes.bool,
}

ButtonsBlock.defaultProps = {
  subscriptionScopeId: '',
  toggleVotingCandidatesVisible: () => {},
  modalTitle: 'white',
  color: 'white',
  url: '',
  hasVotingButton: false,
  withDownloadTicketButton: false,
  hint: '',
  isOpened: false,
}

export default ButtonsBlock
