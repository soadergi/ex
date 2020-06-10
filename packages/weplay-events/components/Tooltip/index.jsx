import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import withRouteInfo from 'weplay-core/routes/withRouteInfo'

import Button, { BUTTON_COLOR } from 'weplay-components/Button'

import styles from './styles.scss'

const Tooltip = ({
  className,
  title,
  text,
  handleClick,
}) => {
  const t = useTranslation()

  return (
    <div className={classNames(
      styles.block,
      className,
    )}
    >
      <p className={styles.title}>
        {title}
      </p>

      <p className={styles.text}>
        {text}
      </p>

      <Button
        className={styles.button}
        color={BUTTON_COLOR.WHITE}
        onClick={handleClick}
      >
        {t('events.eventsRootPage.modals.TournamentNotificationModal.defaultTournamentSlug.saveChangesButton')}
      </Button>
    </div>
  )
}

Tooltip.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
}

Tooltip.defaultProps = {
  className: '',
  title: '',
  text: '',
}

export default withRouteInfo(Tooltip)
