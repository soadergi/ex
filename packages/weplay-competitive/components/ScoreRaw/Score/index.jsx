import React from 'react'
import PropTypes from 'prop-types'
import imgPropType from 'weplay-core/customPropTypes/imgPropType'
import MatchParticipant from 'weplay-competitive/components/MatchParticipant'
import TableRow from 'weplay-competitive/components/TableRow'

import styles from './styles.scss'
import container from './container'

const ScoreTable = ({
  // required props
  match,
  // props from container

  // optional props

}) => (
  <TableRow isDefault>
    <td className={styles.td}>
      <MatchParticipant
        avatar={match.avatar}
        name={match.name}
        subtitle={match.subtitle}
      />
    </td>
    <td className={styles.td}>{match.kills}</td>
    <td className={styles.td}>{match.assists}</td>
    <td className={styles.td}>{match.deaths}</td>
    <td className={styles.td}>{match.krratio}</td>
    <td className={styles.td}>{match.kdratio}</td>
    <td className={styles.td}>{match.headshots}</td>
    <td className={styles.td}>{match.headshot}</td>
    <td className={styles.td}>{match.mvp}</td>
  </TableRow>
)

ScoreTable.propTypes = {
  // required props
// TODO move it to customPropTypes
  match: PropTypes.shape({
    avatar: imgPropType,
    name: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    kills: PropTypes.string.isRequired,
    assists: PropTypes.string.isRequired,
    deaths: PropTypes.string.isRequired,
    krratio: PropTypes.string.isRequired,
    kdratio: PropTypes.string.isRequired,
    headshots: PropTypes.string.isRequired,
    headshot: PropTypes.string.isRequired,
    mvp: PropTypes.string.isRequired,
  }).isRequired,

  // props from container

  // optional props

}

ScoreTable.defaultProps = {
  // optional props
}

export default container(ScoreTable)
