import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Link from 'weplay-components/Link'

import container from 'weplay-competitive/pages/MatchPage/MatchHeader/MatchMainButton/container'

import styles from './styles.scss'

const MatchMainButton = ({
  // required props

  // container props
  buttonLinkTo,
  buttonTextKey,
  handleReadyBtnClick,
  isCurrentParticipantReady,
  readyBtnText,
  showReadyBtn,

  // optional props
}) => {
  const t = useTranslation()

  return (
    <div className={styles.wrapper}>
      {showReadyBtn ? (
        <button
          type="button"
          className={classNames(
            styles.button,
            {
              [styles.isDisabled]: isCurrentParticipantReady,
            },
          )}
          onClick={handleReadyBtnClick}
        >
          <span className={styles.text}>
            {readyBtnText}
          </span>
        </button>
      )
        : (
          <Link
            className={classNames(
              styles.button,
              {
                [styles.isDisabled]: !buttonLinkTo,
              },
            )}
            to={buttonLinkTo}
          >
            <span className={styles.text}>
              {t(`competitive.match.mainButton.${buttonTextKey}`)}
            </span>
          </Link>
        )}
    </div>
  )
}

MatchMainButton.propTypes = {
  // required props

  // container props
  buttonLinkTo: PropTypes.string.isRequired,
  buttonTextKey: PropTypes.string.isRequired,
  handleReadyBtnClick: PropTypes.func.isRequired,
  isCurrentParticipantReady: PropTypes.bool.isRequired,
  showReadyBtn: PropTypes.bool.isRequired,
  readyBtnText: PropTypes.string.isRequired,
  // optional props
}

MatchMainButton.defaultProps = {
  // optional props
}

export default container(MatchMainButton)
