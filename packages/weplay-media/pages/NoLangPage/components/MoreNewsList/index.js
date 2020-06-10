import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import GridTile from 'weplay-components/GridTile/GridTile'
import SubscriptionBlock from 'weplay-components/SubscriptionBlock'
import Article from 'weplay-components/Article'
import Section from 'weplay-components/_wrappers/Section'

import container from './container'

const three = 3

const MoreNewsList = ({
  news,
}) => (
  <Section>
    <GridTile direction="row">
      {news.map((newspaper, index) => (
        <Fragment key={newspaper.newsId}>
          <Article
            article={newspaper}
            modifier="inline"
          />
          {(index === three || (index % 24 === 0 && index > 1)) && (
          <SubscriptionBlock />
          )}
        </Fragment>
      ))}
    </GridTile>
  </Section>
)

MoreNewsList.propTypes = {
  news: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}

export default container(MoreNewsList)
