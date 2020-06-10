import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import Icon from 'weplay-components/Icon'
import CopyLink from 'weplay-components/CopyLink/loadable'

import styles from './styles.scss'

const InviteToDinamicPrizeTournament = ({
  // required props
  link,
  // container props
  // optional props
  className,
}) => {
  const t = useTranslation()

  return (
    <div className={classNames(
      styles.block,
      className,
    )}
    >
      <p className={styles.title}>
        {t('competitive.tournament.prizePool.invite')}
      </p>
      <CopyLink
        tooltipIcon="check"
        text={link}
      >
        <Icon
          iconName="link"
          className={styles.icon}
        />
        <span className={styles.text}>
          {t('competitive.tournament.prizePool.link')}
        </span>
      </CopyLink>
    </div>
  )
}

InviteToDinamicPrizeTournament.propTypes = {
  // required props
  link: PropTypes.string.isRequired,
  // container props
  // optional props
  className: PropTypes.string,
}

InviteToDinamicPrizeTournament.defaultProps = {
  // optional props
  className: '',
}

export default InviteToDinamicPrizeTournament
