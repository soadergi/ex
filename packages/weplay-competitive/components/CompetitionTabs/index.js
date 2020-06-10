import React, { useCallback, useMemo } from 'react'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'

import Link from 'weplay-components/Link'

import useDiscipline from 'weplay-competitive/hooks/useDiscipline'

import styles from './styles.scss'

const CompetitionTabs = () => {
  const t = useTranslation()
  const { tournamentDiscipline } = useDiscipline()
  const tabs = useMemo(() => [
    {
      name: NAMES.TOURNAMENTS,
      title: t('competitive.tournaments.navigation.tournamentLink'),
      isNew: false,
    },
    {
      name: NAMES.LADDERS,
      title: t('competitive.tournaments.navigation.ladderLink'),
      isNew: true,
    },
  ], [t])
  const getLinkUrl = useCallback(name => pathWithParamsByRoute(
    name,
    {
      discipline: tournamentDiscipline.url,
    },
  ), [tournamentDiscipline])

  return (
    <div className={styles.list}>
      {tabs.map(tab => (
        <Link
          key={tab.name}
          activeClassName={styles.isActive}
          exact
          className={classNames(
            styles.link,
            {
              [styles.isNew]: tab.isNew,
            },
          )}
          to={getLinkUrl(tab.name)}
        >
          {tab.title}
        </Link>
      ))}
    </div>
  )
}

CompetitionTabs.propTypes = {
}

export default CompetitionTabs
