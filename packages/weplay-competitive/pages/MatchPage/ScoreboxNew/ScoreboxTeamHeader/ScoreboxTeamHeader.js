import React from 'react'
import classNames from 'classnames'

import UserAvatar from 'weplay-components/UserAvatar'
import Icon from 'weplay-components/Icon'

import TableRow from 'weplay-competitive/components/TableRow'

import styles from './ScoreboxTeamHeader.scss'

export const ScoreboxTeamHeader = ({
  // required props

  // container props

  // optional props
}) => (
  <div className={styles.wrap}>
    <div>
      <div className={styles.title}>
        <Icon
          iconName="team-new"
          className={styles.icon}
          size="24"
        />
        <p className={styles.titleTeam}>
          Team1
        </p>
      </div>
      <div className={styles.title}>
        <UserAvatar
          size="48"
        />
        <p className={styles.titleName}>
          Team_name_1
        </p>
      </div>
    </div>
    <table className={styles.tableTeam}>
      <thead>
        <TableRow>
          <td className={styles.cell}>
            <Icon
              iconName="defuse"
              className={styles.icon}
              size="24"
            />
          </td>
          <td className={styles.cell}>
            <Icon
              iconName="terrorists"
              className={styles.icon}
              size="24"
            />
          </td>
          <td className={styles.cell}>
            <Icon
              iconName="scorebox"
              className={styles.icon}
              size="24"
            />
          </td>
        </TableRow>
      </thead>
      <tbody>
        <TableRow>
          <td className={styles.cell}>10</td>
          <td className={styles.cell}>9</td>
          <td
            className={classNames(
              styles.cell,
              styles.positive,
            )}
          >
            16
          </td>
        </TableRow>
      </tbody>
    </table>
  </div>
)

ScoreboxTeamHeader.propTypes = {
  // required props

  // container props

  // optional props
}

ScoreboxTeamHeader.defaultProps = {
  // optional props
}

export default ScoreboxTeamHeader
