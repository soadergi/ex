import Head from 'next/head'
import React from 'react'

import withRouter from 'weplay-singleton/RouterProvider/withRouter'

const OpenGraph = ({
  title,
  description,
  img = {},
  currentUrl,
}) => (
  <Head>
    <meta
      property="og:title"
      content={title}
    />
    <meta
      property="og:description"
      content={description}
    />
    <meta
      property="og:image"
      content={img.url}
    />
    <meta
      property="og:url"
      content={`https://about.weplay.tv${currentUrl}`}
    />
    <meta
      property="og:image:width"
      content={img.width}
    />
    <meta
      property="og:image:height"
      content={img.height}
    />
    <meta
      property="og:site_name"
      content="https://about.weplay.tv"
    />
    <meta
      property="article:author"
      content="https://www.facebook.com/WePlayEsport/"
    />
    <meta
      property="article:publisher"
      content="https://www.facebook.com/WePlayEsport/"
    />
  </Head>
)

export default withRouter(OpenGraph)
