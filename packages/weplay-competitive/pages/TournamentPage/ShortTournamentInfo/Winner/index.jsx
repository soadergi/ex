import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import transliterate from 'weplay-core/helpers/translit'
import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'
import Icon from 'weplay-components/Icon'
import Link from 'weplay-components/Link'
import teamPropType from 'weplay-competitive/customPropTypes/teamPropType'
import memberPropType from 'weplay-competitive/customPropTypes/memberPropType'

import styles from '../styles.scss'

const Winner = ({
  winner,
  discipline,
}) => {
  const t = useTranslation()

  return (
    <>
      <div className={styles.header}>
        <Icon
          iconName="cup"
          className={styles.icon}
        />
        <span className="u-text-bold">
          {t('competitive.tournament.info.winner')}
        </span>
      </div>
      <Link
        className={styles.title}
        isExternal
        to={pathWithParamsByRoute(
          NAMES[winner.type.toUpperCase()],
          {
            memberId: winner.id,
            memberName: transliterate(R.pathOr('', ['user', 'nickname'])(winner)),
            teamId: winner.id,
            teamName: transliterate(R.pathOr('', ['name'])(winner)),
            discipline,
          },
        )}
      >
        {winner.user ? R.pathOr('', ['user', 'nickname'])(winner) : winner.name}
      </Link>
    </>
  )
}

Winner.propTypes = {
  // required props
  discipline: PropTypes.string.isRequired,
  winner: PropTypes.oneOfType([
    memberPropType,
    teamPropType,
  ]).isRequired,
}

export default Winner
