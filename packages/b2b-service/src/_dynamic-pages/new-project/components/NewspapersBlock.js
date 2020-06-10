import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Link from 'weplay-components/Link'
import Icon from 'weplay-components/Icon'

import B2BSection from 'components/B2BSection/B2BSection'
import Articles from 'components/Articles/Articles'

import classes from '../styles.scss'

const MAX_NEWS_QUANTITY = 4

const NewspapersBlock = ({ newspapers }) => {
  const t = useTranslation()
  const isNewspapersExists = Boolean(newspapers.length)
  const slicedNewspapers = newspapers.slice(0, MAX_NEWS_QUANTITY)
  const button = (
    <div className={classes.buttonWrap}>
      <Link
        to="/blog"
        className={classes.button}
      >
        {t('common.news.button.text')}
        <Icon
          size="small"
          iconName="arrow-link"
          className="u-ml-1"
        />
      </Link>
    </div>
  )

  return isNewspapersExists && (
    <B2BSection>
      <Articles
        newspapers={slicedNewspapers}
        button={button}
      />
    </B2BSection>
  )
}

export default NewspapersBlock
