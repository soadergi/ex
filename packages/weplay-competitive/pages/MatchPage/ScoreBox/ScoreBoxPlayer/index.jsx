import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import transliterate from 'weplay-core/helpers/translit'
import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'
import imgPropType from 'weplay-core/customPropTypes/imgPropType'
import MatchParticipant from 'weplay-competitive/components/MatchParticipant'
import TableRow from 'weplay-competitive/components/TableRow'
import { scoreBoxCsGoPlayersPropType } from 'weplay-competitive/customPropTypes/statistic/csGoPropType'
import { scoreBoxDotaPlayerPropType } from 'weplay-competitive/customPropTypes/statistic/dotaPropType'

import container from './container'
import styles from './styles'

const ScoreBoxPlayer = ({
  // required props
  player,
  scoreBoxCells,
  // props from container
  avatar,
  name,
  memberId,
  couldBeRendered,
  isPremiumAccount,
  // optional props

  // props from HOCs
  discipline,

}) => (
  couldBeRendered
    ? (
      <TableRow isDefault>
        <Fragment>
          <td className={styles.td}>

            {/* TODO: @rbogdanov update subtitle for team players in team game mode */}

            <MatchParticipant
              avatar={avatar}
              name={name}
              subtitle=""
              link={pathWithParamsByRoute(
                NAMES.MEMBER,
                {
                  memberId,
                  memberName: transliterate(name),
                  discipline,
                },
              )}
              isPremiumAccount={isPremiumAccount}
            />
          </td>
          {scoreBoxCells.map(
            cell => (
              <td
                className={styles.td}
                key={cell.value}
              >
                {player[cell.value]}
              </td>
            ),
          )}
        </Fragment>
      </TableRow>
    )
    : null
)

ScoreBoxPlayer.propTypes = {
  // required props
  player: PropTypes.oneOfType([
    scoreBoxCsGoPlayersPropType,
    scoreBoxDotaPlayerPropType,
  ]).isRequired,
  scoreBoxCells: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  // props from container
  avatar: imgPropType.isRequired,
  name: PropTypes.string.isRequired,
  memberId: PropTypes.number.isRequired,
  couldBeRendered: PropTypes.bool.isRequired,
  isPremiumAccount: PropTypes.bool.isRequired,

  // optional props

  // props from HOCs
  discipline: PropTypes.string.isRequired,

}

ScoreBoxPlayer.defaultProps = {
  // optional props
}

export default container(ScoreBoxPlayer)
