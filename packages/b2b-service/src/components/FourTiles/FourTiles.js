import React from 'react'

import { NewsCardMarkup } from 'weplay-components/NewsSection/NewsCard'
import Headline from 'weplay-components/HeadLine'

import classes from './FourTiles.scss'

const larges = [1, 3]

const FourTiles = ({
  title,
  tiles,
}) => (
  <>
    <Headline
      className="u-text-center"
      title={title}
    />
    <div className={classes.block}>
      <div className={classes.wrap}>
        {tiles.slice(-4).map((tile, index) => {
          delete tile.publishedDate // eslint-disable-line
          return (
            <NewsCardMarkup
              key={tile.title}
              modifiers={larges.includes(index)
                ? ['newsLargeCard', 'noOverlay']
                : ['newsCard', 'newsCardImg', 'noOverlay']}
              isLargeNews={larges.includes(index)}
              title={tile.title}
              image={tile.image}
              newspaper={tile}
              url={tile.url}
              hasCommentsAndBookmark={false}
              hasTags={false}
            />
          )
        })}
      </div>
    </div>
  </>
)

export default React.memo(FourTiles)
