import Head from 'next/head'
import React from 'react'

import OpenGraph from '../OpenGraph/OpenGraph'

const SeoTags = ({
  title,
  description,
  img,
}) => (
  <>
    <Head>
      <title>
        {title}
      </title>
      <meta
        name="description"
        content={description}
      />
    </Head>
    <OpenGraph
      title={title}
      description={description}
      img={img}
    />
  </>
)

export default React.memo(SeoTags)
