import PropTypes from 'prop-types'
import React, { Fragment } from 'react'

import { getSortedTagsByNewspaper } from 'weplay-core/helpers/getSortedTagsByNewspaper'
import newspaperPropType from 'weplay-core/customPropTypes/newsPaperPropType'

import Skeleton from 'weplay-components/Skeleton'
import Tags from 'weplay-components/Tags'

import Quote from 'weplay-media/components/Quote/Quote'

import styles from './NewspaperBody.scss'
import { CONTENT_TYPES } from './config'
import container from './container'
import EmbeddedBlock from './EmbeddedBlock'
import ImageBlock from './ImageBlock/ImageBlock'
import TextBlock from './TextBlock'
import Table from './Table'
import RegisterButton from './RegisterButton/RegisterButton'

const NewspaperBody = ({
  // required props
  newspaper,
  // container props
  blocks,
  withRegisterButton,
  // optional props
  hasTags,
}) => (
  <div className={styles.block}>
    {hasTags && (
      <Tags
        specialTag={newspaper.specialTag}
        tagsForNews={getSortedTagsByNewspaper(newspaper)}
        isFullList
      />
    )}
    <p className={styles.description}>
      {newspaper.description || <Skeleton />}
    </p>
    {blocks.map(block => (
      <Fragment key={block.id}>
        {block.type === CONTENT_TYPES.TEXT && (
          <TextBlock content={block.body} />
        )}

        {block.type === CONTENT_TYPES.TABLE && (
          <Table content={block.body} />
        )}

        {block.type === CONTENT_TYPES.IMAGE && (
          <ImageBlock images={block.images} />
        )}

        {block.type === CONTENT_TYPES.QUOTE && (
          <Quote quote={block} />
        )}
        {block.type === CONTENT_TYPES.EMBEDDED && (
          <EmbeddedBlock block={block} />
        )}
      </Fragment>
    ))}

    {/* TODO: this implementation is not the final and could be reviewed after the promo company */}
    {withRegisterButton && <RegisterButton />}
  </div>
)

NewspaperBody.propTypes = {
  // required props
  newspaper: newspaperPropType.isRequired,
  // container props
  blocks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  withRegisterButton: PropTypes.bool.isRequired,
  // optional props
  hasTags: PropTypes.bool,
}

NewspaperBody.defaultProps = {
  // optional props
  hasTags: true,
}

export default container(NewspaperBody)
