import React, { useMemo } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'

import Logo from 'weplay-components/Logo'
import Link from 'weplay-components/Link'

import { commonLegals, GAME_LEGAL_TEXT_KEY } from 'weplay-mini-games/config/legals'

import styles from './GameFooter.scss'

const GameFooter = ({
  gameLegalSlug,
  infoText,
  color,
}) => {
  const t = useTranslation()

  const legals = useMemo(() => ([
    {
      slug: gameLegalSlug,
      lokaliseKey: GAME_LEGAL_TEXT_KEY,
    },
    ...commonLegals,
  ]), [gameLegalSlug])

  return (
    <div className={classNames(
      styles.block,
      styles[color],
    )}
    >
      <div className={styles.logoWrap}>
        <Link
          to="/"
          target="_blank"
          className={styles.logo}
        >
          <Logo color={color === 'blue' ? '' : 'white'} />
        </Link>
        <ul className={styles.list}>
          {legals.map(legal => (
            <li key={legal.slug}>
              <Link
                to={pathWithParamsByRoute(NAMES.SERVICE_PAGE, { legalName: legal.slug })}
                className={styles.link}
                target="_blank"
              >
                {t(legal.lokaliseKey)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.copy}>
        <p>
          {`© 2011 - ${(new Date()).getFullYear()} ${t('mediaCore.miniGames.footer.copyright')}`}
        </p>
        {infoText && <p>{infoText}</p>}
      </div>
    </div>
  )
}

GameFooter.propTypes = {
  gameLegalSlug: PropTypes.string.isRequired,
  infoText: PropTypes.string,
  color: PropTypes.string,
  // optional props
}

GameFooter.defaultProps = {
  color: '',
  infoText: '',
}

export default React.memo(GameFooter)
