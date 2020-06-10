import {
  compose, withHandlers,
  withPropsOnChange,
} from 'recompose'

import withRouter from 'weplay-singleton/RouterProvider/withRouter'

import { getPrefix, trimResidualSlash } from 'weplay-core/routes/_helpers'

const container = compose(
  withRouter,
  withPropsOnChange([
    'locale',
    'to',
    'state',
  ], ({
    locale,
    to,
    state,
  }) => {
    if (!to) {
      console.warn('no to attr in Link')
      return ({
        isExternal: true,
      })
    }
    // TODO: @illia extract external and internal link to separate components
    if (to.includes('://')) {
      return ({
        isExternal: true,
      })
    }
    // TODO: @Illia add suppot for object to params as well
    const [pathname, search] = to.split('?')
    const dirtyPath = `${getPrefix(locale)}${pathname}`
    return ({
      toGoWithState: {
        pathname: trimResidualSlash(dirtyPath),
        search: search ? `?${search}` : '',
        state: state || {},
      },
    })
  }),
  withHandlers({
    handleClick: ({
      onClick,
      disabled,
    }) => (event) => {
      if (disabled) {
        event.preventDefault()
      } else if (onClick) {
        onClick(event)
      }
    },
  }),
)

export default container
