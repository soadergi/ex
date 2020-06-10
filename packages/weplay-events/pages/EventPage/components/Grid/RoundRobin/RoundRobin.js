import React, { useMemo, useState } from 'react'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Switcher from 'weplay-components/Switcher'
import Button, { BUTTON_COLOR, BUTTON_PRIORITY } from 'weplay-components/Button'

import gridPropType from 'weplay-events/customPropTypes/gridPropType'

import StandingsSection from './StandingsSection/StandingsSection'
import CrossTableSection from './CrossTableSection/CrossTableSection'
import RoundRobinTooltip from './RoundRobinTooltip/RoundRobinTooltip'
import useRoundRobin from './useRoundRobin'
import styles from './RoundRobin.scss'

const MODES = {
  CROSS_TABLE: 'crossTable',
  STANDINGS: 'standings',
}

const RoundRobin = ({ grid }) => {
  const [activeMode, setActiveMode] = useState(MODES.CROSS_TABLE)
  const inactiveMode = useMemo(() => (activeMode === MODES.CROSS_TABLE ? MODES.STANDINGS : MODES.CROSS_TABLE),
    [activeMode])
  const {
    matchMatrix,
    participants,
    groupedMatchesByParticipant,
  } = useRoundRobin(grid)

  const t = useTranslation()
  const [isDuplicatesVisible, setDuplicatesVisible] = useState(true)

  return (
    <div className={styles.block}>
      <div className={styles.leftSide}>
        <Button
          className={styles.button}
          color={BUTTON_COLOR.BASIC}
          priority={BUTTON_PRIORITY.SECONDARY}
          onClick={() => setActiveMode(inactiveMode)}
        >
          {t(`events.roundRobin.switchButton.${inactiveMode}Text`)}
        </Button>

        {activeMode === MODES.CROSS_TABLE && (
          <>
            <span className={classNames(
              styles.square,
              styles.wins,
            )}
            />
            <span className={styles.description}>{t('events.roundRobin.crossTable.tooltipWinsText')}</span>
            <span className={classNames(
              styles.square,
              styles.loses,
            )}
            />
            <span className={styles.description}>{t('events.roundRobin.crossTable.tooltipLosesText')}</span>
          </>
        )}

        {/* TODO: Need to render when will be ready hover for score in table/standing */}
        {/* && (
          <>
            <span className={classNames(
              styles.square,
              styles.playoffs,
            )}
            />
            <span className={styles.description}>{t('events.roundRobin.standings.tooltipPlayoffText')}</span>
          </>
        */}
      </div>

      <RoundRobinTooltip />

      {activeMode === MODES.CROSS_TABLE && (
        <>
          <div className={styles.rightSide}>
            <span className={styles.text}>
              {isDuplicatesVisible
                ? t('events.roundRobin.crossTable.buttonHideText')
                : t('events.roundRobin.crossTable.buttonOpenText')}
            </span>

            <Switcher
              value={isDuplicatesVisible}
              onChange={() => setDuplicatesVisible(isVisible => !isVisible)}
            />
          </div>

          <CrossTableSection
            matchMatrix={matchMatrix}
            grid={grid}
            participants={participants}
            isDuplicatesVisible={isDuplicatesVisible}
          />
        </>
      )}

      {activeMode === MODES.STANDINGS && (
        <StandingsSection
          grid={grid}
          participants={participants}
          matchesByParticipant={groupedMatchesByParticipant}
        />
      )}
    </div>
  )
}

RoundRobin.propTypes = {
  grid: gridPropType.isRequired,
}

export default React.memo(RoundRobin)
