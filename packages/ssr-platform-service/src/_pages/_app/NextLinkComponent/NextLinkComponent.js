import Link from 'next/link'
import React from 'react'
import classNames from 'classnames'
import withRouter from 'weplay-singleton/RouterProvider/withRouter'
import { getNextHref } from 'ssr-platform-service/src/helpers/getNextHref'

const NextLink = ({
  to,
  onClick,
  children,
  className,
  LinkComponent,
  exact,
  activeClassName,

  location,
  history,
  match,
  isNext,
  currentUrl,
  ...props
}) => {
  const newPathname = to.search ? `${to.pathname}?${to.search}` : to.pathname
  const nextHref = getNextHref(newPathname)
  return (
    <Link
      href={nextHref}
      as={newPathname}
    >
      <a
        onClick={onClick}
        className={classNames(className, {
          [activeClassName]: newPathname === location.pathname,
        })}
        {...props}
      >
        {children}
      </a>
    </Link>
  )
}
export const NextLinkComponent = withRouter(NextLink)
