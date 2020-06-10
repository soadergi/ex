import React from 'react'
import PropTypes from 'prop-types'
import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { NAMES } from 'weplay-core/routes'
import PageHelmet from 'weplay-components/PageHelmet'

import Body from './Body'
import container from './container'

const ServicePage = ({
  servicePageData,
  seoInfo,
}) => (
  <>
    <PageHelmet
      seoInfo={seoInfo}
    />
    <Body>
      <div
        data-qa-id={dataQaIds.pages[NAMES.SERVICE_PAGE].container}
        dangerouslySetInnerHTML={servicePageData && { __html: servicePageData.body }}
      />
    </Body>
  </>
)
ServicePage.propTypes = {
  servicePageData: PropTypes.shape({
    body: PropTypes.string,
  }),
  seoInfo: PropTypes.shape({}).isRequired,
}

ServicePage.defaultProps = {
  servicePageData: {},
}

export default container(ServicePage)
