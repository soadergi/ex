import * as R from 'ramda'
import {
  compose,
  defaultProps,
  pure,
  withPropsOnChange,
} from 'recompose'

import { WINDOW_WIDTHS } from 'weplay-core/consts/windowWidths'

const hexPlaceholderRegexp = /((?:[0-9a-f]{3}){1,2})-((?:[0-9a-f]{3}){1,2})-((?:[0-9a-f]{3}){1,2})/i

const getGradientPlaceholder = (srcUrl) => {
  const [,
    // colors from skeleton
    color1 = 'eeeeee',
    color2 = 'f5f5f5',
    color3 = 'eeeeee',
  ] = hexPlaceholderRegexp.exec(srcUrl) ?? []
  return {
    background: `linear-gradient(90deg, #${color1} 0%, #${color2} 50%, #${color3} 100%)`,
  }
}
const container = compose(
  pure,
  defaultProps({
    widths: WINDOW_WIDTHS,
  }),
  withPropsOnChange([
    'src',
    'widths',
  ], ({
    src,
    widths,
  }) => {
    const isInBuild = R.is(Object, src)
    return ({
      isInBuild,
      originalSrc: isInBuild ? src.src : src,
      srcSet: isInBuild ? widths.map(width => `${src.src}?w=${width} ${width}w`).join(', ') : '',
      placeholderSrc: isInBuild ? src.placeholder : '',
      placeholderStyle: isInBuild ? { background: '' } : getGradientPlaceholder(src),
    })
  }),
  withPropsOnChange([
    'originalSrc',
    'srcSet',
    'isInBuild',
  ], ({
    originalSrc,
    srcSet,
    isInBuild,
  }) => ({
    // TODO: remove isInBuild with isExternal when static service supports webp
    originalSrc,
    srcSet: isInBuild
      ? srcSet.replace(/.(jpe?g|png) /g, '.webp ')
      : srcSet,
  })),
)

export default container
