import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Scrollbars } from 'react-custom-scrollbars'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import ModalBase from 'weplay-components/ModalBase'
import Button, { BUTTON_PRIORITY } from 'weplay-components/Button'

import Section from 'weplay-competitive/components/Section'
import memberPropType from 'weplay-competitive/customPropTypes/memberPropType'
import Member from 'weplay-competitive/components/Modals/PickStandInMembersModal/Member'

import container from './container'
import styles from './styles.scss'

const sectionModification = ['noContainerPaddingX', 'noPaddingY']

const PickStandInMembersModal = ({
  // required props
  isShown,
  onCloseModal,
  members,
  quantity,
  // props from container
  toggleCheckbox,
  selectedMemberIds,
  handlerOnJoinTournament,
  // optional props
}) => {
  const t = useTranslation()
  return (
    <ModalBase
      handleClose={onCloseModal}
      isShown={isShown}
    >
      <div className="u-pt-6">
        <Section
          title={t('competitive.tournament.modals.pickStandInMembers.title')}
          subtitle={
            t('competitive.tournament.modals.pickStandInMembers.subTitle',
              { number: quantity })
          }
          icon="team"
          modifiers={sectionModification}
        >
          <div className={styles.content}>
            <Scrollbars
              autoHide
            >
              <ul className={styles.list}>
                {members.map(member => (
                  <Member
                    key={member.id}
                    id={member.id}
                    avatar={R.pathOr('', ['user', 'avatar'])(member)}
                    name={R.pathOr('', ['user', 'nickname'])(member)}
                    toggleCheckbox={toggleCheckbox}
                    isPremiumAccount={R.pathOr(false, ['user', 'isPremiumAccount'])(member)}
                  />
                ))}
              </ul>
            </Scrollbars>
          </div>
          <div className={styles.bottom}>
            <Button
              className={classNames(
                styles.left,
                styles.button,
              )}
              onClick={handlerOnJoinTournament}
              disabled={selectedMemberIds.length > quantity}
            >
              {t('competitive.tournament.modals.pickStandInMembers.confirmBtnText')}
            </Button>
            <Button
              priority={BUTTON_PRIORITY.SECONDARY}
              className={styles.button}
              onClick={onCloseModal}
            >
              {t('competitive.tournament.modals.pickStandInMembers.closeBtnText')}
            </Button>
          </div>
        </Section>
      </div>
    </ModalBase>
  )
}

PickStandInMembersModal.propTypes = {
  // required props
  members: PropTypes.arrayOf(memberPropType).isRequired,
  isShown: PropTypes.bool.isRequired,
  quantity: PropTypes.number.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  toggleCheckbox: PropTypes.func.isRequired,
  selectedMemberIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  handlerOnJoinTournament: PropTypes.func.isRequired,
  // optional props
}

PickStandInMembersModal.defaultProps = {
  // optional props
}

export default container(PickStandInMembersModal)
