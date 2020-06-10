import {
  compose,
  withHandlers,
} from 'recompose'

import withRouter from 'weplay-singleton/RouterProvider/withRouter'
import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

const withI18n = compose(
  withRouter,
  withLocale,
  withHandlers({
    setLang: ({
      history,
      locale: languageFromPath,
      isNext,
    }) => (language) => {
      // TODO: create here more general structure
      if (languageFromPath !== language) {
        if (isNext) {
          const newPathname = language === 'ru'
            ? `/ru${history.location.asPath}`
            : history.location.asPath.replace('/ru', '')
          history.replace(newPathname || '/')
        } else {
          const newPathname = language === 'ru'
            ? `/ru${history.location.pathname}`
            : history.location.pathname.replace('/ru', '')

          history.replace({
            pathname: newPathname || '/',
            search: history.location.search,
          })
        }
      }
    },
  }),
)

export default withI18n
