import React, { Fragment, PureComponent } from 'react'

import IsomorphicHead from 'weplay-components/IsomorphicHead'

import { hotjarScript } from 'weplay-competitive/HOCs/hotjar/hotjar'

const withHotjar = (WrappedComponent) => {
  const HOC = class extends PureComponent {
    render() {
      return (
        <>
          <IsomorphicHead>
            <script>
              {hotjarScript}
            </script>
          </IsomorphicHead>
          <WrappedComponent {...this.props} />
        </>
      )
    }
  }

  return HOC
}

export default withHotjar
