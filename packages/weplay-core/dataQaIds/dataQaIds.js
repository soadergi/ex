import { NAMES } from '../routes'

const core = {
  skeletonSpan: 'skeletonSpan',
  liveComments: {
    list: 'liveCommentsList',
  },
  liveComment: {
    chatItem: 'liveCommentsChatItem',
    name: 'liveCommentsName',
    date: 'liveCommentsDate',
    anchor: 'liveCommentsAnchor',
    link: 'liveCommentsLink',
  },
}

const pages = {
  [NAMES.ROOT]: {
    container: `${NAMES.ROOT}PageContainer`,
  },
  articlePage: {
    title: 'articleTitle',
    body: 'articleBody',
    sideBar: 'sidebar',
    comments: {
      filters: {
        link: 'filterLink',
        linkActive: 'filterLinkActive',
      },
    },
  },
  profilePage: {
    saveButton: 'profilePageSaveButton',
    confirmDeleteButton: 'profilePageConfirmDeleteButton',
  },
}

const modals = {
  components: {
    emailPasswordForm: {
      btnSubmit: 'emailPasswordFormButtonSubmit',
    },
  },
  loginModal: {
    error: 'emailPasswordFormError',
    infoMessage: 'emailPasswordFormInfoMessage',
  },
}

const components = {
  userAvatar: {
    image: 'userAvatarImage',
  },
  subscriptionForm: 'subscriptionForm',
  newsFeed: 'newsFeed',
  newsInfiniteList: 'newsInfiniteList',
}
function getPagesQAIds(names) {
  return names.reduce((accumulator, pageName) => {
    accumulator[pageName] = {
      container: `${pageName}PageContainer`,
    }

    return accumulator
  }, {})
}
const extendedWithContainerPage = getPagesQAIds(Object.values(NAMES))
export const dataQaIds = {
  core,
  pages: {
    ...extendedWithContainerPage,
    ...pages,
  },
  modals,
  components,
}
