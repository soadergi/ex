import React from 'react'

import SocialList from 'weplay-components/SocialList'

import { useSocialChannels } from './container'
import styles from './styles.scss'

const socialLinksModificationsVideos = ['videos', 'greyBackground']

const SocialChannels = () => {
  const { socialChannelsList } = useSocialChannels()

  return (
    <SocialList
      className={styles.socialList}
      links={socialChannelsList}
      modifiers={socialLinksModificationsVideos}
      linkIcon="arrow-link"
    />
  )
}

export default React.memo(SocialChannels)
