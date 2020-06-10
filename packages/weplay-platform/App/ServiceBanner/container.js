import {
  compose,
  branch,
  renderNothing,
  withHandlers,
  withPropsOnChange,
  lifecycle,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import withRouteInfo from 'weplay-core/routes/withRouteInfo'
import config from 'weplay-core/config'
import { isUserAdminSelector, isUserHasTicketsManagementRightsSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import { backofficeContentLinkSelector, isContentPublishedSelector } from 'weplay-core/reduxs/contentEditLink/reducer'
import { apiHostSelector, globalScopeSelector } from 'weplay-core/reduxs/common/selectors'

const bannerGlobalCSSVar = '--wp-service-banner-height'

const container = compose(
  withLocale,
  connect(createStructuredSelector({
    // selectors
    globalScope: globalScopeSelector,
    apiHost: apiHostSelector,
    isUserAdmin: isUserAdminSelector,
    isUserTicketsAdmin: isUserHasTicketsManagementRightsSelector,
    isContentPublished: isContentPublishedSelector,
    backofficeContentLink: backofficeContentLinkSelector,
  }), {
    // actionCreators
  }),

  branch(
    ({ isUserAdmin, isUserTicketsAdmin }) => !isUserAdmin && !isUserTicketsAdmin,
    renderNothing,
  ),

  withRouteInfo,

  withHandlers(() => {
    let banner
    return {
      bannerRef: () => (node) => { banner = node },
      setBannerGlobalVar: ({ globalScope }) => () => {
        const bodyNode = globalScope.document.querySelector('body')
        // TODO: if we wanna use --wp-service-banner-height in CSS func calc(),
        //  we need to set default value. Because css do not handle unknown variables @Mambyk
        bodyNode.setAttribute('style', `${bannerGlobalCSSVar}: ${banner.offsetHeight}px`)
      },
    }
  }),

  withPropsOnChange([
    'isContentPublished',
    'backofficeContentLink',
  ], ({
    isContentPublished,
    backofficeContentLink,
  }) => ({
    userRole: isContentPublished ? 'admin' : 'editor',
    contentLink: isContentPublished ? 'init' : backofficeContentLink,
  })),

  withPropsOnChange([
    't',
    'apiHost',
    'userRole',
    'contentLink',
  ], ({
    t,
    apiHost,
    userRole,
    contentLink,
  }) => ({
    message: t(`serviceBanner.${userRole}.message`) ?? '',
    buttonText: t(`serviceBanner.${userRole}.buttonText`) ?? '',
    link: `${apiHost}/${config.backofficeApi.url}/${contentLink}`,
    ticketsPageButtonText: t(`serviceBanner.${userRole}.ticketsPageButtonText`) ?? '',
  })),

  lifecycle({
    componentDidMount() {
      this.props.setBannerGlobalVar()
      // TODO: @Andrew, think about throttling if it needs. Or HOC if we'll use this listener
      this.props.globalScope.addEventListener('resize', this.props.setBannerGlobalVar)
    },

    componentWillUnmount() {
      this.props.globalScope.removeEventListener('resize', this.props.setBannerGlobalVar)
    },
  }),
)

export default container
