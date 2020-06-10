import React from 'react'
import PropTypes from 'prop-types'

import ContentContainer from 'weplay-components/_wrappers/ContentContainer'

import NewsFeed from 'weplay-media/components/Newsfeed'
import MoreNewsList from 'weplay-media/pages/NoLangPage/components/MoreNewsList'

import NoLangAlert from '../components/NoLangAlert'
import Tabs from '../components/Tabs'
import { PATH_NAME_PREFIXES } from '../constants'

import container from './container'

const NewsNoLang = ({
  t,
  articleAnotherLanguage,
  articleTitleAnotherLanguage,
  topIds,
  popularIds,
  latestIds,
  activeTab,
}) => (
  <>
    <ContentContainer>
      <NoLangAlert
        text={t('mediaCore.noLangPage.alertText')}
        link={t('mediaCore.noLangPage.alertLink')}
        titleBefore={articleTitleAnotherLanguage
          ? t('mediaCore.noLangPage.alertTitleBefore')
          : t('mediaCore.noLangPage.alertTitleBeforeNoName')}
        titleAfter={t(`mediaCore.noLangPage.alertTitleAfter.${PATH_NAME_PREFIXES.NEWS}`)}
        articleAnotherLang={articleAnotherLanguage}
        articleTitleAnotherLang={articleTitleAnotherLanguage}
        showFlagBlock
      />
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
)

NewsNoLang.propTypes = {
  t: PropTypes.func.isRequired,
  topIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  popularIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  latestIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  articleAnotherLanguage: PropTypes.string.isRequired,
  articleTitleAnotherLanguage: PropTypes.string.isRequired,
  activeTab: PropTypes.string.isRequired,
}

export default container(NewsNoLang)
