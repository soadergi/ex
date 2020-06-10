import React from 'react'
import classNames from 'classnames'

import imgPropType from 'weplay-core/customPropTypes/imgPropType'

import SvgIcon from 'weplay-components/SvgIcon'

import MatchParticipant from 'weplay-competitive/components/MatchParticipant'
import TableRow from 'weplay-competitive/components/TableRow'

import styles from './ScoreboxPlayer.scss'

export const ScoreboxPlayer = ({
  // required props
  scorebox,
  avatar,

}) => (
  <TableRow>
    <td className={styles.cell}>
      <div className={styles.headerWrapper}>
        <MatchParticipant
          avatar={avatar}
          name={scorebox.name}
          subtitle=""
        />
      </div>
    </td>
    <td className={classNames(
      styles.cell,
      styles.right,
    )}
    >
      {scorebox.kills}
    </td>
    <td className={classNames(
      styles.cell,
      styles.team,
      styles.right,
    )}
    >
      {scorebox.assists}
    </td>
    <td className={classNames(
      styles.cell,
      styles.right,
    )}
    >
      {scorebox.deaths}
    </td>
    <td className={styles.cell}>
      {scorebox.KD}
      <div className={classNames(
        styles.indicator,
        styles.min,
      )}
      />
    </td>
    <td className={classNames(
      styles.cell,
      styles.team,
    )}
    >
      {scorebox.KR}
      <div className={classNames(
        styles.indicator,
        styles.middle,
      )}
      />
    </td>
    <td className={classNames(
      styles.cell,
      styles.team,
    )}
    >
      {scorebox.OR}
    </td>
    <td className={styles.cell}>{scorebox.HS}</td>
    <td className={styles.cell}>
      {scorebox.ADR}
      <div className={classNames(
        styles.indicator,
        styles.max,
      )}
      />
    </td>
    <td className={classNames(
      styles.cell,
      styles.team,
    )}
    >
      {scorebox.FA}
    </td>
    <td className={classNames(
      styles.cell,
      styles.team,
    )}
    >
      {scorebox.MVP}
      <SvgIcon
        iconName="star"
        className={styles.icon}
      />
    </td>
    <td className={classNames(
      styles.cell,
      styles.team,
    )}
    >
      {scorebox.ACE}
    </td>
    <td
      className={classNames(
        styles.positive,
        styles.cell,
        styles.right,
      )}
    >
      {scorebox.points}
    </td>
    <td
      className={classNames(
        styles.negative,
        styles.cell,
        styles.right,
      )}
    >
      {scorebox.WCR}
    </td>
  </TableRow>
)

ScoreboxPlayer.propTypes = {
  // required props
  avatar: imgPropType.isRequired,
  scorebox: imgPropType.isRequired,

  // container props

  // optional props
}

ScoreboxPlayer.defaultProps = {
  // optional props
}

export default ScoreboxPlayer
