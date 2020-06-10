import FacebookLogin from './FacebookLogin'
import GoogleLogin from './GoogleLogin'
import OAuth2Login from './OAuth2Login'

// TODO: remove this and rewrite SocialNetworksLogin
export const getComponentsFromNames = array => (
  array.map((config) => {
    switch (config.symbol) {
      case 'fb':
        return { config, component: FacebookLogin }
      case 'g+':
        return { config, component: GoogleLogin }
      case 'vk':
      case 'faceit':
      case 'discord':
      case 'twitch':
        return { config, component: OAuth2Login }
      default:
        return {}
    }
  })
)
