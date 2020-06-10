import classNames from 'classnames'
import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'
import transliterate from 'weplay-core/helpers/translit'

import Icon from 'weplay-components/Icon'
import Label from 'weplay-components/Label'
import Link from 'weplay-components/Link'
import Image from 'weplay-components/Image'

import Wrapper from 'weplay-competitive/components/Wrapper'
import { MATCH_STATUSES } from 'weplay-competitive/constants/matchStatuses'
import ladderPropType from 'weplay-competitive/customPropTypes/ladderPropType'
import useDiscipline from 'weplay-competitive/hooks/useDiscipline'
import decorImage from 'weplay-competitive/components/TournamentsListing/TournamentCard/img/featured.svg'

import styles from './styles.scss'

const TopPriorityLadder = ({
  ladder,
}) => {
  const t = useTranslation()
  const { tournamentDiscipline } = useDiscipline()
  return (
    <Wrapper>
      <div className={styles.block}>
        <Image
          src={decorImage}
          className={styles.background}
        />

        <div className={styles.info}>
          {ladder?.isFetched && (
            <>
              <Label
                className={styles.status}
                color={classNames(
                  {
                    success: ladder?.ladderStatus === MATCH_STATUSES.ONGOING,
                    warning: ladder?.ladderStatus === MATCH_STATUSES.UPCOMING,
                  },
                )}
              >
                {t(`competitive.tournaments.statuses.${ladder.ladderStatus}`)}
              </Label>
              <div className={styles.title}>
                <Link
                  to={pathWithParamsByRoute(
                    NAMES.LADDER,
                    {
                      discipline: tournamentDiscipline.url,
                      ladderName: transliterate(ladder.name),
                      ladderId: ladder.id,
                    },
                  )}
                  className={styles.link}
                >
                  {ladder?.name ?? ''}
                </Link>
              </div>
              <div className={styles.subtitle}>
                {ladder?.description ?? ''}
              </div>
              <span className={styles.prize}>
                <Icon
                  size="small"
                  iconName="prize"
                  className={classNames(
                    'u-mr-1',
                    styles.icon,
                  )}
                />
                <span className={styles.text}>
                  {/* TODO: @Tetiana find prize for 1th place */}
                  {ladder?.ladderPrizes?.[0]?.description ?? ''}
                </span>
              </span>
            </>
          )}
        </div>

        <div className={styles.img}>
          <Image
            className={styles.imgBanner}
            src="https://static-prod.weplay.tv/2020-02-28/9a1007d80df00890c3d3be45686620d2.323537-3FBBEA-C2CACF.png"
            alt=""
          />
        </div>
      </div>
    </Wrapper>
  )
}

TopPriorityLadder.propTypes = {
  ladder: ladderPropType,
}

TopPriorityLadder.defaultProps = {
  ladder: {},
}

export default TopPriorityLadder
