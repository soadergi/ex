import * as R from 'ramda'

import coverImageBig from 'weplay-core/img/cover.png'
import coverImageSmall from 'weplay-core/img/cover_sm.png'

const imageDummyAlt = 'Cover Image'
const imageTypes = {
  large: 3,
  big: 4,
  standard: 5,
  alternative: 6,
  square: 7,
  longread: 11,
}
const smallImageTypes = [imageTypes.alternative, imageTypes.square]

export default (newspaper, type) => {
  let media
  const mediaType = R.contains(type, R.keys(imageTypes)) ? imageTypes[type] : imageTypes.standard
  const newspaperMedia = R.pipe(
    R.propOr([], 'media'),
    R.find(R.propEq('mediaType', mediaType)),
  )(newspaper)

  if (!newspaperMedia && type === imageTypes.square) return null

  if (!newspaperMedia) {
    media = R.contains(mediaType, smallImageTypes)
      ? { url: coverImageSmall, alt: imageDummyAlt }
      : { url: coverImageBig, alt: imageDummyAlt }
  } else {
    media = {
      url: newspaperMedia.path,
      alt: R.pathOr(imageDummyAlt, ['attributes', 'alt'], newspaperMedia),
    }
  }
  return media
}
