import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import styles from './MatchDetailsButton.scss'
import { useMatchDetails } from './MatchDetailsProvider'

const MatchDetailsButton = ({ matchId, className }) => {
  const t = useTranslation()
  const { setMatchId } = useMatchDetails()
  const handleClick = useCallback(() => setMatchId(matchId), [matchId])

  return (
    <button
      type="button"
      className={classNames(
        styles.detailsButton,
        className,
      )}
      onClick={handleClick}
    >
      {t('tugOfWar.matchDetailsButton.name')}
    </button>
  )
}

MatchDetailsButton.propTypes = {
  matchId: PropTypes.string.isRequired,
  className: PropTypes.string,
}

MatchDetailsButton.defaultProps = {
  className: '',
}

export default React.memo(MatchDetailsButton)
