import React from 'react'

const GTM = () => (
  <>
    <noscript>
      <iframe
        title="gtm"
        src="https://www.googletagmanager.com/ns.html?id=GTM-NTGXV3K"
        height="0"
        width="0"
        style={{
          display: 'none',
        }}
      />
    </noscript>
  </>
)

export default React.memo(GTM)
