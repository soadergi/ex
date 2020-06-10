import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { SOCIAL_NAMES } from 'weplay-core/config'

import SocialPost from 'weplay-components/SocialPost'

import WrapperWithCaption from '../WrapperWithCaption'

import styles from './styles.scss'
import { useEmbeddedBlock } from './container'

const EmbeddedBlock = ({
  block,
}) => {
  const {
    post,
    caption,
    isAlignLeft,
  } = useEmbeddedBlock({ block })

  if (!post) return null

  return (
    <div className={classNames(
      styles.block,
      { [styles.left]: isAlignLeft },
    )}
    >
      <WrapperWithCaption text={caption}>
        <SocialPost
          post={post}
          className={classNames({ [styles.tweet]: post.type === SOCIAL_NAMES.TW })}
        />
      </WrapperWithCaption>
    </div>
  )
}

EmbeddedBlock.propTypes = {
  block: PropTypes.shape({}).isRequired,
}

export default React.memo(EmbeddedBlock)
