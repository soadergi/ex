import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Headline from 'weplay-components/HeadLine'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import Section, { PADDING_Y } from 'weplay-components/_wrappers/Section'

import classes from './Facts.scss'

const Facts = ({
  facts,
}) => {
  const t = useTranslation()
  return (

    <Section
      paddingY={PADDING_Y.SM}
    >
      <div className={classes.block}>
        <ContentContainer>
          <Headline
            className="u-text-center"
            title={t('aboutUsPage.facts.title')}
          />
          <div className={classes.wrap}>
            {facts.map(fact => (
              <div
                key={fact.titleKey}
              >
                <p className={classes.title}>
                  {t(fact.titleKey)}
                </p>
                <p className={classes.text}>
                  {t(fact.textKey)}
                </p>
              </div>
            ))}
          </div>
        </ContentContainer>
      </div>
    </Section>
  )
}

export default React.memo(Facts)
