import React from 'react'
import Head from 'next/head'

const AlternateHead = ({ links }) => (
  <Head>
    {Object.keys(links).map(lang => (
      <link
        rel="alternate"
        hrefLang={lang}
        href={links[lang]}
        key={lang}
      />
    ))}
  </Head>
)
export default AlternateHead
