import React from 'react'
import PropTypes from 'prop-types'

import countdownPropType from 'weplay-core/customPropTypes/countdownPropType'
import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { NAMES } from 'weplay-core/routes'

import HrefLangLink from 'weplay-components/HrefLangLink'
import BottomArticles from 'weplay-components/BottomArticles'
import PageHelmet from 'weplay-components/PageHelmet'
import SubscriptionBlock from 'weplay-components/SubscriptionBlock'
import Section from 'weplay-components/_wrappers/Section'

import votingPropType from 'customPropTypes/votingPropType'

import TopScreen from './TopScreen'
import Candidates from './Candidates'
import Winner from './Winner'
import container from './container'

const subscribeFormModifiers = ['promo']

const VotingPage = ({
  i18nTexts,
  ogImages,
  hrefLangPathname,
  candidates,
  countdown,
  status,
  handleVote,
  articles,
  newsTag,
  voting,
  currentLanguage,
  firstCandidate,
  thirdCandidate,
}) => (
  <>
    <PageHelmet ogImage={ogImages[currentLanguage]} />

    <HrefLangLink pathname={hrefLangPathname} />

    {voting
      ? (
        <TopScreen
          i18n={i18nTexts}
          countdown={countdown}
          status={status}
          voting={voting}
          candidate={thirdCandidate}
        />
      )
      : null}

    <div
      className="u-pb-2 u-pb-md-4"
      data-qa-id={dataQaIds.pages[NAMES.VOTING].container}
    >
      <Winner
        candidate={thirdCandidate}
        playerFeedback={i18nTexts.voting.winner.gamerText}
        editorFeedback={i18nTexts.voting.winner.editorText}
      />

      <Candidates
        candidates={candidates}
        firstCandidate={firstCandidate}
        onVote={handleVote}
      />

      <Section className="u-pt-8">
        <SubscriptionBlock
          wrapperClass="u-mb-5"
          modifiers={subscribeFormModifiers}
        />
        <BottomArticles
          title={i18nTexts.voting.news.title}
          linkUrl={`/tags/${newsTag}`}
          linkText={i18nTexts.voting.news.allLink}
          articles={articles}
        />
      </Section>
    </div>
  </>
)

VotingPage.propTypes = {
  i18nTexts: PropTypes.shape({}).isRequired,

  ogImages: PropTypes.shape({}).isRequired,
  hrefLangPathname: PropTypes.string.isRequired,
  candidates: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  firstCandidate: PropTypes.shape({}).isRequired,
  thirdCandidate: PropTypes.shape({}).isRequired,

  countdown: countdownPropType.isRequired,
  status: PropTypes.string.isRequired,

  handleVote: PropTypes.func.isRequired,
  articles: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  newsTag: PropTypes.string.isRequired,
  voting: votingPropType,
  currentLanguage: PropTypes.string.isRequired,
}

VotingPage.defaultProps = {
  voting: null,
}

export default container(VotingPage)
