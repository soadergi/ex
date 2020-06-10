import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import articlesPropType from 'weplay-core/customPropTypes/articlesPropType'

import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import SectionBody from 'weplay-components/SectionBody'
import BottomArticles from 'weplay-components/BottomArticles'

import container from './container'

const TournamentBottomArticles = ({
  // props from container
  sourceType,
  sourceId,
  first3Articles,
  i18nTexts,
  routeInfo,
  sectionHeaderModifiers,
  sectionBodyModifiers,
  className,
  customTournamentTitle,
}) => (
  <SectionBody
    className={classNames(
      'u-order-7',
      {
        [className]: className,
      },
    )}
    linkUrl={`/${_.kebabCase(sourceType)}s/${sourceId}`}
    linkText={i18nTexts.events[customTournamentTitle || routeInfo.title].news.allLink}
    modifiers={sectionBodyModifiers}
  >
    <ContentContainer>
      <BottomArticles
        title={i18nTexts.events[customTournamentTitle || routeInfo.title].news.title}
        linkUrl={`/${_.kebabCase(sourceType)}s/${sourceId}`}
        linkText={i18nTexts.events[customTournamentTitle || routeInfo.title].news.allLink}
        articles={first3Articles}
        sectionHeaderModifiers={sectionHeaderModifiers}
      />
    </ContentContainer>
  </SectionBody>
)

TournamentBottomArticles.propTypes = {
  // required props
  i18nTexts: PropTypes.shape({}).isRequired,
  sourceType: PropTypes.string.isRequired,
  sourceId: PropTypes.number.isRequired,
  first3Articles: articlesPropType.isRequired,
  routeInfo: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,

  // optional props
  sectionHeaderModifiers: PropTypes.arrayOf(PropTypes.string),
  sectionBodyModifiers: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
  customTournamentTitle: PropTypes.string,
}

TournamentBottomArticles.defaultProps = {
  // optional props
  sectionHeaderModifiers: [],
  sectionBodyModifiers: [],
  className: '',
  customTournamentTitle: '',
}

export default container(TournamentBottomArticles)
