import React from 'react'
import PropTypes from 'prop-types'

import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { NAMES } from 'weplay-core/routes'

import IsomorphicHead from 'weplay-components/IsomorphicHead'

import NewsNoLang from 'weplay-media/pages/NoLangPage/NewsNoLang'

import SpecialTagNoLang from './SpecialTagNoLang'
import container from './container'

const NoLangPage = ({
  isNews,
  isSpecialTag,
}) => (
  <div
    className="u-py-2 u-py-md-4"
    data-qa-id={dataQaIds.pages[NAMES.NO_LANG].container}
  >
    <IsomorphicHead>
      <meta
        name="robots"
        content="noindex, nofollow"
      />
    </IsomorphicHead>
    {isNews && <NewsNoLang />}
    {isSpecialTag && <SpecialTagNoLang />}
  </div>
)

NoLangPage.propTypes = {
  isNews: PropTypes.bool.isRequired,
  isSpecialTag: PropTypes.bool.isRequired,
}

export default container(NoLangPage)
