import * as R from 'ramda'
import {
  compose,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { homepageSliderImagesSelector } from 'weplay-core/reduxs/homepage/reducer'
import { createNewsByIdSelector } from 'weplay-core/reduxs/news/reducer'
import { transformUrl } from 'weplay-core/helpers/transformUrl'

const mapPropsToNewsIds = R.pipe(
  R.pathOr([], ['sliderData', 'news']),
  R.map(R.prop('newsId')),
)

const container = compose(
  connect(createStructuredSelector({
    // selectors
    newsList: createNewsByIdSelector(mapPropsToNewsIds),
    sliderImages: homepageSliderImagesSelector,
  }), {
    // actionCreators
  }),

  withPropsOnChange([
    'newsList',
    'sliderData',
    'sliderImages',
  ], ({
    newsList,
    sliderData,
    sliderImages,
  }) => ({
    title: R.propOr('', 'title', sliderData),
    slides: R.map(
      newspaper => ({
        id: newspaper.newsId,
        title: newspaper.title,
        images: {
          preview: R.pathOr('', [newspaper.newsId, 'previewUrl'], sliderImages),
          lg: R.pathOr('', [newspaper.newsId, 'bigImageUrl'], sliderImages),
          md: R.pathOr('', [newspaper.newsId, 'smallImageUrl'], sliderImages),
        },
        url: `/news/${transformUrl(newspaper)}`,
      }),
    )(newsList),
  })),
)

export default container
