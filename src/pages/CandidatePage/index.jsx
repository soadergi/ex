import React from 'react'
import PropTypes from 'prop-types'

import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { NAMES } from 'weplay-core/routes'

import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import BottomArticles from 'weplay-components/BottomArticles'
import PageHelmet from 'weplay-components/PageHelmet'
import SubscriptionBlock from 'weplay-components/SubscriptionBlock'
import Section from 'weplay-components/_wrappers/Section'

import CandidateContainer from './CandidateContainer'
import container from './container'

const subscribeFormModifiers = ['promo']

const CandidatePage = ({
  i18nTexts,
  handleClose,
  votingOptionId,
  ogImages,
  currentLanguage,
  first3Articles,
  newsTag,
  seoParams,
}) => (
  <div
    className="u-py-2 u-py-md-4"
    data-qa-id={dataQaIds.pages[NAMES.CANDIDATE].container}
  >
    <ContentContainer>
      <div className="u-px-0 u-pb-3 u-px-sm-5 u-px-md-0">
        <PageHelmet
          ogImage={ogImages[currentLanguage]}
          subPageName="essay"
          seoParams={seoParams}
        />
        <CandidateContainer
          i18nTexts={i18nTexts}
          handleClose={handleClose}
          votingOptionId={Number(votingOptionId)}
        />

        <SubscriptionBlock
          modifiers={subscribeFormModifiers}
        />
      </div>
      <Section>
        <BottomArticles
          title={i18nTexts.voting.news.title}
          linkUrl={`/tags/${newsTag}`}
          linkText={i18nTexts.voting.news.allLink}
          articles={first3Articles}
        />
      </Section>
    </ContentContainer>
  </div>
)

CandidatePage.propTypes = {
  i18nTexts: PropTypes.shape({}).isRequired,
  handleClose: PropTypes.func.isRequired,
  votingOptionId: PropTypes.number.isRequired,
  ogImages: PropTypes.shape({}).isRequired,
  seoParams: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  currentLanguage: PropTypes.string.isRequired,
  first3Articles: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  newsTag: PropTypes.string.isRequired,
}

export default container(CandidatePage)
