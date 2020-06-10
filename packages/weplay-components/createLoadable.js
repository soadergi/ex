import { omit } from 'ramda'
import loadable from '@loadable/component'
import React from 'react'
import {
  compose,
  withState,
  lifecycle,
  branch,
  renderNothing,
  mapProps,
} from 'recompose'

import Skeleton from 'weplay-components/Skeleton'

import LazyDiv from './LazyDiv'

const omitProps = keys => mapProps(omit(keys))

const DEFAULT_LAZY_OFFSET = 300
const withSafety = compose(
  withState('hasError', 'setError', false),

  lifecycle({
    componentDidCatch(error, errorInfo) {
      this.props.setError(true)
      console.warn(error, errorInfo)
      // TODO: log to sentry and show fallback
    },
  }),

  branch(({ hasError }) => hasError, renderNothing),
  omitProps([
    'hasError',
    'setError',
  ]),
)
//   TODO: remove ASAP, dirty hack to avoid dependcney of comopnents on next/dynamic
let loader
const defaultLoader = ({
  loadModule,
  fallback,
  // noSSR,
}) => loadable(loadModule, {
  fallback,
})
if (typeof window === 'undefined') {
  loader = global.loader ?? defaultLoader
} else {
  loader = window.loader ?? defaultLoader
}
//   ENDTODO: remove ASAP, dirty hack to avoid dependcney of comopnents on next/dynamic
export const createLoadable = ({
  loadModule,
  fallback = <Skeleton count={10} />,
  skeletonOptions,
  offset = DEFAULT_LAZY_OFFSET,
  isLazyLoading = true,
}) => {
  const Loadable = loader({
    loadModule,
    fallback: skeletonOptions
      ? <Skeleton {...skeletonOptions} />
      : fallback,
  })

  const Lazy = ({
    ...props
  }) => (
    <LazyDiv offset={offset}>
      <Loadable {...props} />
    </LazyDiv>
  )

  return withSafety(isLazyLoading ? Lazy : Loadable)
}
