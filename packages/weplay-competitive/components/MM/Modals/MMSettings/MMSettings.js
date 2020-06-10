import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Button, { BUTTON_SIZE, BUTTON_PRIORITY, BUTTON_COLOR } from 'weplay-components/Button'
import ModalBase from 'weplay-components/ModalBase'
import Icon from 'weplay-components/Icon'

import useDiscipline from 'weplay-competitive/hooks/useDiscipline'
import { useUserRestrictions } from 'weplay-competitive/hooks/MM/useUserRestrictions'

import Option from './Option'
import { GAME_MODES, GAME_SERVERS, TEMP_LADDER } from './config'
import styles from './styles.scss'
import { useMMSettingsModal } from './useMMSettingsModal'
import { useQueryLaddersRequest } from './useQueryLaddersRequest'
import { useCreateQueue } from './useCreateQueue'

const MMModifier = ['MMModal', 'md']

const MMSettings = ({
  isShown,
  onCloseModal,
}) => {
  const t = useTranslation()
  const { tournamentDiscipline } = useDiscipline()
  const modalImageStyle = useMemo(() => ({
    backgroundImage: `url(${tournamentDiscipline.backgrounds.MMSettings ?? ''})`,
  }), [tournamentDiscipline])
  useQueryLaddersRequest()
  const { handleUserRestrictions, hasRestrictions } = useUserRestrictions()
  const {
    activeMode,
    setActiveMode,
    activeServer,
    setActiveServer,
    setActiveLadder,
    filteredLaddersByModeType,
    activeLadder,
    isActiveSettingsSetupBtn,
  } = useMMSettingsModal()

  const handleCreateQueue = useCreateQueue({
    activeMode,
    activeLadder,
    activeServer,
    onCloseModal,
  })

  const handleStartMM = () => {
    handleUserRestrictions()
      .then(() => {
        if (hasRestrictions) {
          onCloseModal()
        } else {
          handleCreateQueue()
        }
      })
  }

  return (
    <ModalBase
      isShown={isShown}
      handleClose={onCloseModal}
      modifiers={MMModifier}
    >
      <div
        className={styles.content}
        style={modalImageStyle}
      >
        <h1 className={styles.title}>
          {t('competitive.modals.matchmaking.settingsTitle')}
        </h1>
        <div className={styles.subTitle}>
          <Icon
            className={styles.icon}
            iconName="csgo-prime"
          />
          <span>
            {t('competitive.modals.matchmaking.settingsSubTitle')}
          </span>
        </div>
        <div className={styles.settingGroup}>
          <h6 className={styles.settingTitle}>
            {`1. ${t('competitive.matchmaking.modsTitle')}`}
          </h6>
          <div className={styles.settingList}>
            {GAME_MODES.map(mode => (
              <Option
                key={mode.name}
                type={mode.type}
                isActive={mode.name === activeMode.name}
                name={mode.name}
                disabled={mode.disabled}
                onClickHandler={() => setActiveMode(mode)}
              />
            ))}
          </div>
        </div>

        <div className={styles.settingGroup}>
          <h6 className={styles.settingTitle}>
            {`2. ${t('competitive.matchmaking.regionTitle')}`}
          </h6>
          <div className={classNames(
            styles.settingList,
            styles.half,
          )}
          >
            {GAME_SERVERS.map(server => (
              <Option
                key={server.name}
                type={server.type}
                isActive={server.name === activeServer.name}
                name={server.name}
                disabled={server.disabled}
                onClickHandler={() => setActiveServer(server)}
              />
            ))}
          </div>
        </div>

        <div className={styles.settingGroup}>
          <h6 className={styles.settingTitle}>
            {`3. ${t('competitive.matchmaking.ladderTitle')}`}
          </h6>
          <div className={classNames(
            styles.settingList,
            styles.half,
          )}
          >
            {filteredLaddersByModeType.map((ladder, index) => (
              <Option
                key={ladder?.name ?? index}
                type={ladder?.type}
                isActive={ladder?.name === activeLadder?.name}
                name={ladder?.name}
                disabled={!ladder?.name}
                onClickHandler={() => setActiveLadder(ladder)}
              />
            ))}
            {!filteredLaddersByModeType.length && (
              <div className={styles.settingEmpty}>
                {t('competitive.modals.matchmaking.noLadders')}
              </div>
            )}
            {filteredLaddersByModeType.length === 1 && (
              <Option
                key={TEMP_LADDER.name}
                type={TEMP_LADDER.type}
                isActive={false}
                name={TEMP_LADDER.name}
                disabled
                onClickHandler={() => {}}
              />
            )}
          </div>
        </div>

        <div className={styles.footer}>
          <Button
            className={styles.main}
            size={BUTTON_SIZE.LG}
            color={BUTTON_COLOR.CTA}
            disabled={!isActiveSettingsSetupBtn}
            onClick={handleStartMM}
          >
            {t('competitive.matchmaking.ready')}
          </Button>

          <Button
            className={styles.extra}
            size={BUTTON_SIZE.LG}
            priority={BUTTON_PRIORITY.GHOST_WHITE}
            onClick={onCloseModal}
          >
            {t('competitive.matchmaking.cancel')}
          </Button>
        </div>
      </div>
    </ModalBase>
  )
}
MMSettings.propTypes = {
  // required props
  isShown: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
}

export default MMSettings
