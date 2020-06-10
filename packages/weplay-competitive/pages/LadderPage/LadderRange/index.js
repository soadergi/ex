import React, { useMemo } from 'react'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Link from 'weplay-components/Link'
import Period from 'weplay-components/Period'
import Label from 'weplay-components/Label'
import Skeleton from 'weplay-components/Skeleton'

import ladderPropType from 'weplay-competitive/customPropTypes/ladderPropType'
import { LADDER_STATUSES } from 'weplay-competitive/constants/ladderStatuses'

import styles from './styles.scss'

const zenDeskHowToLinks = {
  en: 'https://weplayhelp.zendesk.com/hc/en-us/articles/360006900157-WePlay-Ladders-F-A-Q-',
  // eslint-disable-next-line max-len
  ru: 'https://weplayhelp.zendesk.com/hc/ru/articles/360006900157-WePlay-%D0%9B%D0%B0%D0%B4%D0%B4%D0%B5%D1%80%D1%8B-F-A-Q-',
}

const LadderRange = ({
  ladder,
}) => {
  const t = useTranslation()
  const { locale } = useLocale()

  const zenDeskHowToLink = useMemo(
    () => zenDeskHowToLinks[locale],
    [locale],
  )

  if (!ladder.isFetched) {
    return (
      <Skeleton
        height="24px"
        width="200px"
      />
    )
  }

  return (
    <div className={styles.container}>
      <p className={styles.subTitle}>
        {ladder.description}
      </p>
      <Link
        to={zenDeskHowToLink}
        isExternal
      >
        {t('competitive.ladders.link.howToLink')}
      </Link>
      <div className={styles.info}>
        <Period
          startDateTime={ladder.startDate}
          endDateTime={ladder.endDate}
        />
        <Label
          className={styles.status}
          color={ladder.ladderStatus === LADDER_STATUSES.ONGOING
            ? 'success'
            : 'white'}
        >
          {t(`competitive.ladders.statuses.${ladder.ladderStatus}`)}
        </Label>
      </div>
    </div>
  )
}

LadderRange.propTypes = {
  ladder: ladderPropType.isRequired,
}

export default React.memo(LadderRange)
