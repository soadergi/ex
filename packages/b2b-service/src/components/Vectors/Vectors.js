import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Icon from 'weplay-components/Icon'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import Headline from 'weplay-components/HeadLine'
import Section, { PADDING_Y } from 'weplay-components/_wrappers/Section'

import classes from './Vectors.scss'

const Vectors = ({
  vectors,
  title,
}) => {
  const t = useTranslation()

  return (
    <Section
      paddingY={PADDING_Y.SM}
    >
      <ContentContainer>
        <Headline
          className="u-text-center"
          title={title}
        />
        <div className={classes.block}>
          {vectors.map(vector => (
            <div key={vector.titleKey}>
              {vector.icon && (
                <Icon
                  className={classes.icon}
                  iconName={vector.icon}
                  size="large"
                />
              )}
              <p className={classes.title}>
                {t(vector.titleKey)}
              </p>
              <p className={classes.description}>
                {t(vector.textKey)}
              </p>
            </div>
          ))}
        </div>
      </ContentContainer>
    </Section>
  )
}

export default React.memo(Vectors)
