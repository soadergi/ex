import React from 'react'
import MediaPage from 'weplay-media/pages/MediaPage'
import { getInitialData } from 'weplay-media/pages/MediaPage/actionChains'

const MediaPageSSR = () => (
  <MediaPage renderedOnServer />
)
MediaPageSSR.getInitialProps = async ({
  ctx,
  initialLocale,
}) => getInitialData(initialLocale)(ctx.store.dispatch, ctx.store.getState)
export default MediaPageSSR
