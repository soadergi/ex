import Link from 'next/link'
import React from 'react'
import { getNextHref } from 'helpers/getNextHref'

export const NextLinkComponent = ({
  to,
  handleClick,
  children,
  className,
  LinkComponent,
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
        onClick={handleClick}
        className={className}
        {...props}
      >
        {children}
      </a>
    </Link>
  )
}
