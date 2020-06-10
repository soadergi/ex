import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'
import SectionHeader from 'weplay-components/SectionHeader'
import NewspaperCard from 'weplay-components/NewspaperCard'
import newsPropType from 'weplay-media/customPropTypes/newsPropType'

import styles from './styles.scss'
import container from './container'

const LatestNews = ({
  // required props
  latest5News,
  title,
  // container props
  // optional props
  className,
  createAnalyticsWithLabel,

}) => (
  <div className={classNames(
    styles.latestNews,
    className,
  )}
  >
    <SectionHeader
      title={title}
    />
    <ul className={styles.list}>
      {latest5News.map((newspaper, index) => (
        <NewspaperCard
          key={newspaper.newsId}
          newspaper={newspaper}
          onClick={createAnalyticsWithLabel(index)}
          titleColor="white"
          timeColor="gray"
          bookmarkColor="blue"
          hasActivities
          {...getAnalyticsAttributes({
            category: 'Latest news',
            action: newspaper.title,
            label: index + 1,
          })}
        />
      ))}
    </ul>
  </div>
)

LatestNews.propTypes = {
  // required props
  latest5News: newsPropType.isRequired,
  title: PropTypes.string.isRequired,
  // container props
  // optional props
  className: PropTypes.string,
  createAnalyticsWithLabel: PropTypes.func,
}

LatestNews.defaultProps = {
  className: '',
  createAnalyticsWithLabel: R.always,
}

export default container(LatestNews)
