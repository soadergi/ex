import React, { useMemo, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { useParams } from 'weplay-singleton/RouterProvider/useParams'
import { useRoutes } from 'weplay-singleton/RoutesProvider/useRoutes'

import { capitalizeFirstLetter } from 'weplay-core/helpers/capitalizeFirstLetter'
import { useRouteInfo } from 'weplay-core/routes/useRouteInfo'
import webAnalytics from 'weplay-core/services/webAnalytics'
import historyPropType from 'weplay-core/customPropTypes/historyPropType'
import { triggerSignUpModal } from 'weplay-core/reduxs/_legacy/modals/actions'
import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'
import { isLoggedInSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'
import { ARTICLE_TYPE_NAMES } from 'weplay-core/consts/articleTypes'

import HrefLangLink from 'weplay-components/HrefLangLink'
import SubscriptionBlock from 'weplay-components/SubscriptionBlock'
import PageHelmet from 'weplay-components/PageHelmet'
import Link from 'weplay-components/Link'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import Image from 'weplay-components/Image'
import SectionHeader from 'weplay-components/SectionHeader'
import InlineTabs from 'weplay-components/InlineTabs'
import SeoBlock from 'weplay-components/SeoBlock/SeoBlock'
import Section from 'weplay-components/_wrappers/Section'
import RouteChangeAlert from 'weplay-components/RouteChangeAlert/RouteChangeAlert'

import NewsInfiniteList from 'weplay-media/components/NewsInfiniteList/NewsInfiniteList'
import CategoryTitle from 'weplay-media/components/CategoryTitle/CategoryTitle'

import { useCategoryTags } from './useCategoryTags'
import CategoryTags from './components/CategoryTags/CategoryTags'
import image from './img/cat-subscr.png'
import styles from './CategoriesPage.scss'
import { useCategory } from './useCategory'
import { useCategoryPageTags } from './useCategoryPageTags.js'
import { useCategoryPageTabs } from './useCategoryPageTabs'
import { useRouteChangeAlert } from './useRouteChangeAlert'
import { sortTags } from './helpers'

const subscribeFormModifiers = ['content', 'shadowNone']

const CategoryPage = ({ history }) => {
  const [isSubscriptionBlock, setIsSubscriptionBlock] = useState(true)
  const routesProps = useRoutes()
  const { routeInfo } = useRouteInfo({ history, ...routesProps })

  const t = useTranslation()
  const dispatch = useDispatch()
  const { categoryName } = useParams()
  const { locale } = useLocale()
  const category = useCategory()

  const isLoggedIn = useSelector(isLoggedInSelector)
  const isMobileWidth = useSelector(isMobileWidthSelector)
  const localization = category.localizations?.[locale] ?? {}

  const title = category.title ?? ''
  const tabs = useMemo(() => localization.tabs?.map(tab => ({
    ...tab,
    path: tab.articleType ? `${ARTICLE_TYPE_NAMES[tab.articleType]}s` : '',
  })), [localization.tabs])

  const activeTab = useCategoryPageTabs(tabs)
  const categoryTags = useCategoryPageTags(activeTab?.tagDisplayType, category.id)

  useEffect(() => {
    webAnalytics.sendPageView({
      pageType: `${capitalizeFirstLetter(routeInfo.name)}Page`,
    })
  }, [routeInfo.name, history.location])

  const openSignUpModal = () => dispatch(triggerSignUpModal())

  const {
    selectedTags,
    handleTagSelect,
    getIsTagActive,
    resetSelectedTags,
    isSelectedTagsEmpty,
    selectedByCategoryTags,
  } = useCategoryTags({
    categoryTags,
    categoryId: category.id,
  })

  const {
    acceptRouteChange,
    isRouteChangeAlert,
  } = useRouteChangeAlert((!isSelectedTagsEmpty && !isLoggedIn))

  const sortedTags = useMemo(() => sortTags(categoryTags, selectedTags), [categoryTags, selectedTags])

  const getTabTitle = tab => (tab.articleType ? t(`mediaCore.categoryPage.tabs.${tab.articleType}`)
    : t('mediaCore.categoryPage.tabs.allNews'))

  const specialTagsIds = useMemo(() => (selectedByCategoryTags.special_tags.length
    ? selectedByCategoryTags.special_tags : null), [selectedByCategoryTags.special_tags])
  const tagsIds = useMemo(() => (selectedByCategoryTags.tags.length
    ? selectedByCategoryTags.tags : null), [selectedByCategoryTags.tags])
  const unusualTagsIds = useMemo(() => (selectedByCategoryTags.unusual_tags.length
    ? selectedByCategoryTags.unusual_tags : null), [selectedByCategoryTags.unusual_tags])

  const categorySeo = localization.seo ?? {}

  return (
    <div
      className={styles.block}
      data-qa-id={dataQaIds.pages[NAMES.CATEGORIES].container}
    >
      <PageHelmet
        seoInfo={activeTab?.seo}
        ogImage={categorySeo.ogImage}
      />
      <HrefLangLink
        pathname={pathWithParamsByRoute(NAMES.CATEGORIES,
          { categoryName, tab: activeTab?.path })}
      />
      <RouteChangeAlert
        title={t('mediaCore.categoryPage.preventRoutingText')}
        subTitle={t('mediaCore.categoryPage.preventRoutingSubText')}
        acceptButtonText={t('mediaCore.preventRouting.acceptButtonText')}
        declineButtonText={t('mediaCore.preventRouting.declineButtonText')}
        onAccept={openSignUpModal}
        onDecline={acceptRouteChange}
        isActive={isRouteChangeAlert}
      />
      <div className={styles.background}>
        {!isMobileWidth && (
          <div className={styles.wrap}>
            <Image
              className={styles.bgImage}
              src={category.background?.path}
            />
          </div>
        )}
      </div>
      <ContentContainer>
        <CategoryTitle
          logo={category.logo?.path}
          title={title}
          text={localization.description}
        />
        <InlineTabs
          className={styles.tabs}
        >
          {tabs?.map(tab => (
            <Link
              exact
              key={tab.path}
              to={pathWithParamsByRoute(NAMES.CATEGORIES,
                { categoryName, tab: tab.path })}
              color="white"
              activeClassName={styles.isActive}
              className={styles.tab}
            >
              <span className={styles.tabTitle}>
                {getTabTitle(tab)}
              </span>
            </Link>
          ))}
        </InlineTabs>
        <CategoryTags
          tags={sortedTags}
          handleTagSelect={handleTagSelect}
          getIsTagActive={getIsTagActive}
          resetSelectedTags={resetSelectedTags}
          isSelectedTagsEmpty={isSelectedTagsEmpty}
        />
        <div className={styles.news}>
          <SectionHeader
            title={t('mediaCore.categoryPage.latestNews.title')}
          />
          {Boolean(category.id) && (
            <NewsInfiniteList
              categoryId={isSelectedTagsEmpty ? category.id : null}
              isTile
              specialTagsIds={specialTagsIds}
              tagsIds={tagsIds}
              unusualTagsIds={unusualTagsIds}
              articleTypeId={activeTab?.articleType}
              fetchLimit={6}
              isWhite
            />
          )}
        </div>
      </ContentContainer>

      {isSubscriptionBlock && (
        <div className={styles.subscriptionBlock}>
          <ContentContainer>
            <div className={styles.subscription}>
              {/* TODO: @frontend add text to SimpleSubscribeForm on mobile */}
              {isMobileWidth && (
                <>
                  <p className={styles.mobileTitle}>{t('mediaCore.categoryPage.subscriptionBlock.title')}</p>
                  <p>{t('mediaCore.categoryPage.subscriptionBlock.text')}</p>
                </>
              )}
              <SubscriptionBlock
                pageName="general"
                withBackground={false}
                modifiers={subscribeFormModifiers}
                wrapperClass={styles.form}
                onSubscribe={() => setIsSubscriptionBlock(false)}
                isSimple={isMobileWidth}
              />
              <Image
                src={image}
                className={styles.image}
              />
            </div>
          </ContentContainer>
        </div>
      )}

      {categorySeo.text && (
        <Section>
          <ContentContainer>
            <SeoBlock
              content={categorySeo.text}
              isDarkMode
            />
          </ContentContainer>
        </Section>
      )}
    </div>
  )
}
CategoryPage.propTypes = {
  history: historyPropType.isRequired,
}
export default CategoryPage
