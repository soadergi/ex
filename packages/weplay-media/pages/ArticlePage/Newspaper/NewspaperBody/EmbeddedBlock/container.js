import { useMemo } from 'react'

import { getHostNameFromUrl } from 'weplay-core/helpers/getHostNameFromUrl'
import { getTwitterPostFromLink } from 'weplay-core/helpers/getTwitterPostFromLink'
import { SOCIAL_NAMES } from 'weplay-core/config'

// for now we can add only 1 link to social post block, but there is possibility in API to add more then 1
export const useEmbeddedBlock = ({ block }) => {
  const link = block.links[0].link

  const hostName = getHostNameFromUrl(link)

  const post = useMemo(() => {
    if (hostName === SOCIAL_NAMES.TW) {
      return getTwitterPostFromLink(link)
    }
    return {
      id: block.id,
      // TODO: @Andrew, temporary dirty fix. Use general solution for Embedded block types
      type: hostName === 'youtu' ? 'youtube' : hostName,
      url: link,
    }
  }, [block, hostName])

  const caption = block.links[0].caption || ''

  const isAlignLeft = block.align === 'left'

  return {
    post,
    caption,
    isAlignLeft,
  }
}
