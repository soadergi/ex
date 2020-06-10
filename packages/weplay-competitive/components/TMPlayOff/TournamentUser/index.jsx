import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import transliterate from 'weplay-core/helpers/translit'
import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'
import Link from 'weplay-components/Link'
import withDiscipline from 'weplay-competitive/HOCs/withDiscipline'

import PlayOffUser from '../PlayOffUser'

import styles from './styles.scss'

const TournamentUser = ({
  participant,
  discipline,
}) => (participant.id ? (
  <Link
    className={styles.user}
    to={pathWithParamsByRoute(
      NAMES[participant.type.toUpperCase()],
      {
        memberId: participant.id,
        memberName: transliterate(R.pathOr('', ['nickname'])(participant)),
        teamId: participant.id,
        teamName: transliterate(R.pathOr('', ['nickname'])(participant)),
        discipline,
      },
    )}
  >
    <PlayOffUser participant={participant} />
  </Link>
) : (
  <PlayOffUser participant={participant} />
))

TournamentUser.propTypes = {
  participant: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    type: PropTypes.string,
    uuid: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
  discipline: PropTypes.string.isRequired,
}

export default withDiscipline(TournamentUser)
