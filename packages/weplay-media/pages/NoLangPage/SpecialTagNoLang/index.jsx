import React from 'react'
import PropTypes from 'prop-types'

import ContentContainer from 'weplay-components/_wrappers/ContentContainer'

import ListingTitle from 'weplay-media/components/ListingTitle'
import NewsFeed from 'weplay-media/components/Newsfeed'
import SpecialTagsList from 'weplay-media/components/SpecialTagsList'

import Alert from '../components/NoLangAlert'
import MoreNewsList from '../components/MoreNewsList'
import Tabs from '../components/Tabs'
import { PATH_NAME_PREFIXES } from '../constants'

import container from './container'

const SpecialTagNoLang = ({
  t,
  topIds,
  popularIds,
  latestIds,
  activeTab,
  goToRoot,
  isSpecialTagsAvailable,
  translationSuffix,
}) => (
  <>

    {isSpecialTagsAvailable
      ? (
        <>
          <ContentContainer>
            <ListingTitle
              handleClick={goToRoot}
              title={t('mediaCore.noLangPage.titleText')}
            />

            <Alert
              text={t('mediaCore.noLangPage.alertText')}
              link={t('mediaCore.noLangPage.alertLink')}
              titleBefore=""
              titleAfter={t(
                `mediaCore.noLangPage.alertTitleAfter.${PATH_NAME_PREFIXES.SPECIAL_TAGS}.${translationSuffix}`,
              )}
              showFlagBlock={false}
              className="u-mb-4 u-mt-4 u-mb-md-5"
            />
            <SpecialTagsList />
          </ContentContainer>
        </>
      )
      : (
        <>
          <ContentContainer>
            <Tabs activeTab={activeTab} />
          </ContentContainer>
          {activeTab === 'top' || activeTab === 'popular'
            ? <MoreNewsList newsIds={activeTab === 'top' ? topIds : popularIds} />
            : (
              <NewsFeed
                latestIds={latestIds}
                isShowSubscribeForm={false}
                hideName
              />
            )}
        </>
      )}
  </>
)

SpecialTagNoLang.propTypes = {
  topIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  popularIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  latestIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  t: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
  translationSuffix: PropTypes.string.isRequired,
  isSpecialTagsAvailable: PropTypes.bool.isRequired,
  goToRoot: PropTypes.func.isRequired,
}

export default container(SpecialTagNoLang)
