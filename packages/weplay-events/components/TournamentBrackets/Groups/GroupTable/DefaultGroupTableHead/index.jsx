import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import routeInfoPropType from 'weplay-core/customPropTypes/routeInfoPropType'

import styles from '../styles.scss'

import container from './container'

const DefaultGroupTableHead = ({
  i18nTexts,
  groupName,
  routeInfo,
}) => (
  <thead className={styles.tHead}>
    <tr>
      <th className={styles.cell}>
        <span className={styles.tHeadTitle}>{groupName}</span>
        <span className={classNames(
          styles.tHeadSubtitle,
          styles.mobileSubtitle,
        )}
        >
          {i18nTexts.events[routeInfo.title].groupTable.players}
        </span>
      </th>
      <th className={styles.cell} />
      <th className={styles.cell} />
      <th className={classNames(
        styles.cell,
        styles.points,
      )}
      >
        <span className={styles.tHeadSubtitle}>{i18nTexts.events[routeInfo.title].groupTable.points}</span>
      </th>
      <th className={classNames(
        styles.cell,
        styles.score,
      )}
      >
        <span className={styles.tHeadSubtitle}>{i18nTexts.events[routeInfo.title].groupTable.score}</span>
      </th>
    </tr>
  </thead>
)

DefaultGroupTableHead.propTypes = {
  i18nTexts: PropTypes.shape({}).isRequired,
  groupName: PropTypes.string.isRequired,
  routeInfo: routeInfoPropType.isRequired,
}

export default container(DefaultGroupTableHead)
