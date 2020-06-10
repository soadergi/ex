import React from 'react'
import PropTypes from 'prop-types'
import routeInfoPropType from 'weplay-core/customPropTypes/routeInfoPropType'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import styles from './styles.scss'
import container from './container'

const DefaultGroupTableHead = ({
  groupName,
  routeInfo,
  isMobileWidth,
}) => {
  const t = useTranslation()

  return (
    <div className={styles.block}>
      <span className={styles.title}>{groupName}</span>
      <div />

      {!isMobileWidth && (
        <>
          <div className={styles.column}>
            <span className={styles.subTitle}>
              {t(`events.${routeInfo.title}.groupTable.players`)}
            </span>
          </div>
          <div className={styles.column}>
            <span className={styles.subTitle}>{t(`events.${routeInfo.title}.groupTable.points`)}</span>
          </div>
          <div className={styles.column}>
            <span className={styles.subTitle}>{t(`events.${routeInfo.title}.groupTable.score`)}</span>
          </div>
        </>
      )}
    </div>
  )
}

DefaultGroupTableHead.propTypes = {
  isMobileWidth: PropTypes.bool.isRequired,
  groupName: PropTypes.string.isRequired,
  routeInfo: routeInfoPropType.isRequired,
}

export default container(DefaultGroupTableHead)
