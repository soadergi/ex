import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Scrollbars } from 'react-custom-scrollbars'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'

import { participantPropType } from 'weplay-events/customPropTypes'

import backgroundUrl from './img/background.jpg'
import useMatchDetailsContent from './useMatchDetailsContent'
import Header from './Header'
import Content from './Content'
import styles from './MatchDetailsContent.scss'

const minPopupContentHeight = 239
const autoHeightMaxSizeScrollBarDesktop = 696

const MatchDetailsContent = ({
  onClose,
  match,
  participants,
}) => {
  const t = useTranslation()
  const isMobileWidth = useSelector(isMobileWidthSelector)
  const { matchGameIds, isParticipantsHaveScore } = useMatchDetailsContent({ match, participants })

  return (
    <div className={styles.block}>
      <Scrollbars
        autoHide
        autoHeight
        autoHeightMin={minPopupContentHeight}
        autoHeightMax={isMobileWidth ? '100vh' : autoHeightMaxSizeScrollBarDesktop}
      >
        <Header
          onClose={onClose}
          participants={participants}
          backgroundUrl={backgroundUrl}
          match={match}
        />

        {isParticipantsHaveScore
          ? (
            <Content
              matchGameIds={matchGameIds}
              participants={participants}
            />
          )
          : <span className={styles.text}>{t('events.matchDetails.emptyStat.text')}</span>}
      </Scrollbars>
    </div>
  )
}

MatchDetailsContent.propTypes = {
  onClose: PropTypes.func.isRequired,
  match: PropTypes.shape({
    status: PropTypes.string,
  }).isRequired,
  participants: PropTypes.arrayOf(
    participantPropType,
  ).isRequired,
}

export default React.memo(MatchDetailsContent)
