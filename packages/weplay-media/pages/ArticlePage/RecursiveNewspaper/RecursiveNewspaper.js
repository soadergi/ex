import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useInView } from 'react-intersection-observer'
import { useSelector } from 'react-redux'

import newspaperPropType from 'weplay-core/customPropTypes/newsPaperPropType'
import { transformUrl } from 'weplay-core/helpers/transformUrl'
import useAction from 'weplay-core/helpers/useAction'
import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'
import { readNewspaper } from 'weplay-core/reduxs/news/actions'
import { createNewspaperByIdSelector } from 'weplay-core/reduxs/news/reducer'

import LazyDiv from 'weplay-components/LazyDiv'

import Newspaper from '../Newspaper/Newspaper'

const RecursiveNewspaper = ({
  newspaper,
  articleLanguages,
  relatedNewspaperIds,
  hasBreadcrumbs,
}) => {
  const globalScope = useSelector(globalScopeSelector)
  const nextNewspaper = useSelector(createNewspaperByIdSelector(() => relatedNewspaperIds[0]))
  const { readNewspaperRequest } = useAction({ readNewspaperRequest: readNewspaper.request })

  const [ref, inView] = useInView({ threshold: 0, rootMargin: '-50%' })
  const newspaperUrl = useMemo(() => transformUrl(newspaper), [newspaper])
  const nextRelatedNewspaperIds = useMemo(() => relatedNewspaperIds.slice(1), // eslint-disable-line no-magic-numbers
    [relatedNewspaperIds])

  useEffect(() => {
    if (relatedNewspaperIds.length) {
      // TODO use get news by id action
      readNewspaperRequest({ targetIds: relatedNewspaperIds[0] })
    }
  }, [relatedNewspaperIds])

  useEffect(() => {
    if (inView && !globalScope.location.pathname.includes(newspaperUrl)) {
      globalScope.history.replaceState(globalScope.history.state, '', newspaperUrl)
    }
  }, [inView, globalScope, newspaperUrl])

  return (
    <>
      <div ref={ref}>
        <Newspaper
          newspaper={newspaper}
          articleLanguages={articleLanguages}
          hasBreadcrumbs={hasBreadcrumbs}
        />
      </div>

      {Boolean(relatedNewspaperIds.length) && (
        <LazyDiv>
          <RecursiveNewspaper
            newspaper={nextNewspaper}
            relatedNewspaperIds={nextRelatedNewspaperIds}
          />
        </LazyDiv>
      )}
    </>
  )
}

RecursiveNewspaper.propTypes = {
  newspaper: newspaperPropType.isRequired,
  articleLanguages: PropTypes.arrayOf(PropTypes.string),
  relatedNewspaperIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  hasBreadcrumbs: PropTypes.bool,
}

RecursiveNewspaper.defaultProps = {
  articleLanguages: [],
  hasBreadcrumbs: false,
}

export default RecursiveNewspaper
