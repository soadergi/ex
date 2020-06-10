import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { formatPrizeWithDigit } from 'weplay-core/helpers/formatPrizeWithDigits'

import ContentContainer from 'weplay-components/_wrappers/ContentContainer'

import classes from './ProjectStats.scss'

const ProjectStats = ({
  stats,
}) => {
  const t = useTranslation()
  return (
    <div className={classes.block}>
      <ContentContainer>
        <div className={classes.wrap}>
          {Object.keys(stats || {}).map((statKey) => {
            const statValue = stats[statKey]
            const formattedStatValue = typeof statValue === 'number'
              ? formatPrizeWithDigit(statValue)
              : statValue
            // TODO @Rohovoi remove lokalise when all will be ready
            const description = t(`projectPage.projectStats.${statKey}.label`) || statKey

            return (
              <div
                id={statKey}
                key={statKey}
                className={classes.content}
              >
                <p className={classes.title}>
                  {formattedStatValue}
                </p>
                <p className={classes.text}>
                  {description}
                </p>
              </div>
            )
          })}
        </div>
      </ContentContainer>
    </div>
  )
}

export default React.memo(ProjectStats)
