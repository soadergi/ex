import React from 'react'
import PropTypes from 'prop-types'

import container from './container'

const Link = ({
  locale,
  to,
  children,
  LinkComponent,
  currentUrl,
  handleClick,

  toGoWithState,
  isExternal,
  isNext,
  disabled,
  activeClassName,
  t,
  // start eject from rest
  useHistory,
  useLocation,
  useParams,
  // end eject from rest
  ...rest
}) => (isExternal
  ? (
    <a
      href={to}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label={to}
      {...rest}
    >
      {children}
    </a>
  ) : (
    <LinkComponent
      to={toGoWithState}
      onClick={handleClick}
      activeClassName={activeClassName}
      aria-label={to}
      {...rest}
    >
      {children}
    </LinkComponent>
  ))

Link.propTypes = {
  locale: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  LinkComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({}),
  ]).isRequired,
  currentUrl: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  useHistory: PropTypes.func.isRequired,
  useLocation: PropTypes.func.isRequired,
  useParams: PropTypes.func.isRequired,

  toGoWithState: PropTypes.shape({}),
  isExternal: PropTypes.bool,
  isNext: PropTypes.bool,
  disabled: PropTypes.bool,
  activeClassName: PropTypes.string,
  t: PropTypes.func,
}

Link.defaultProps = {
  disabled: false,
  activeClassName: '',
  isExternal: false,
  isNext: false,
  toGoWithState: {},
  t: null,
}
export default container(Link)
