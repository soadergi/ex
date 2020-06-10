import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import ModalBase from 'weplay-components/ModalBase'
import CopyLinkButton from 'weplay-components/CopyLinkButton/loadable'
import Button, { BUTTON_COLOR, BUTTON_PRIORITY } from 'weplay-components/Button'

import Section from 'weplay-competitive/components/Section'

import container from './container'
import styles from './styles.scss'

const sectionModification = ['noContainerPaddingX', 'noPaddingY']

const InviteMembersModal = ({
  // required props
  onCloseModal,
  isShown,

  // props from container
  inviteLink,
  resetInviteLink,

  // optional props
}) => {
  const t = useTranslation()

  return (
    <ModalBase
      isShown={isShown}
      handleClose={onCloseModal}
    >
      <Section
        title={t('competitive.team.modals.inviteMembersTitle')}
        subtitle={t('competitive.team.modals.inviteMembersSubTitle')}
        modifiers={sectionModification}
      >
        <div className={styles.wrapper}>
          <p className={styles.inviteLink}>
            {inviteLink}
          </p>
          <CopyLinkButton
            text={t('competitive.team.modals.copyLinkButton')}
            copyLink={inviteLink}
            className={classNames(
              styles.btn,
              'u-mb-2',
              'u-mb-sm-3',
            )}
            tooltipIcon="check"
          />
          <Button
            color={BUTTON_COLOR.BLACK}
            priority={BUTTON_PRIORITY.SECONDARY}
            className={classNames(
              styles.btn,
              'u-mb-2',
              'u-mb-sm-3',
              'u-ml-sm-2',
            )}
            onClick={resetInviteLink}
          >
            {t('competitive.team.modals.inviteMembersButton')}
          </Button>
          <p className={styles.info}>
            {t('competitive.team.modals.inviteMembersTip')}
          </p>
        </div>
      </Section>
    </ModalBase>
  )
}

InviteMembersModal.propTypes = {
  // required props
  isShown: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  // props from container
  resetInviteLink: PropTypes.func.isRequired,
  inviteLink: PropTypes.string,
  // optional props
}

InviteMembersModal.defaultProps = {
  inviteLink: '',
  // optional props
}

export default container(InviteMembersModal)
