import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { WIDTH_SM } from 'weplay-core/reduxs/_legacy/layout/consts'
import Avatar from 'weplay-components/Avatar'
import BackgroundImg from 'weplay-components/BackgroundImg'
import { DISCIPLINES } from 'weplay-competitive/config/disciplines'

import container from './container'
import styles from './styles.scss'

const SMALL_SIZE = 250
const MEDIUM_SIZE = 350
const widths = [SMALL_SIZE, MEDIUM_SIZE, WIDTH_SM]
const EmptyTeamCard = ({
  // required props
  discipline,
  // props from container

  // optional props
}) => {
  const t = useTranslation()
  return (
    <div
      className={styles.block}
    >
      <BackgroundImg
        src={DISCIPLINES[discipline].backgrounds.teamCardPlaceholder}
        sizes="(max-width: 640px) 100vw, 350px"
        widths={widths}
      />
      <div className={styles.header}>
        <Avatar
          className={styles.avatar}
          size="64"
        />
        <p className={styles.title}>
          {t('competitive.member.emptyText.addTeamTitle')}
        </p>
        <p className={styles.subTitle}>
          {t('competitive.member.emptyText.addTeamSubTitle')}
        </p>
      </div>
      <div className={styles.team} />
    </div>
  )
}

EmptyTeamCard.propTypes = {
  // required props
  discipline: PropTypes.string.isRequired,
  // props from container

}

EmptyTeamCard.defaultProps = {
  // optional props
}

export default container(EmptyTeamCard)
