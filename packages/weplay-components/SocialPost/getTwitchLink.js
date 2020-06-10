const TWITCH_CLIPS_EMBED_LINK = 'https://clips.twitch.tv/embed?clip='
export const getTwitchLink = link => TWITCH_CLIPS_EMBED_LINK.concat(link.split('/').pop())
