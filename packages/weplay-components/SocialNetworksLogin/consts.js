import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'

const getRedirectUri = ({ origin, source }) => `${origin}${pathWithParamsByRoute(NAMES.AUTH_VERIFY_CODE, {
  source,
})}`

const getTwitchClientId = (origin) => {
  const twitchClientId = ({
    'http://localhost:3000': '3ub4lze5k3s8ytcp4wv9dvhyb5ep1y',
    'http://localhost:8777': '3ub4lze5k3s8ytcp4wv9dvhyb5ep1y',
    'http://localhost:8080': 'ng0xxsotj2lwcxfcfegh19jnn9fwyn',
    'https://qa.weplay.space': 'l4rxb9384bp3byadeahjxw6yvglj53',
    'https://qa2.weplay.space': 'l4rxb9384bp3byadeahjxw6yvglj53',
    'https://development.weplay.space': 'lyynnrkly4sorly9g1cz8659utcogx',
    'https://weplay.tv': 'yb1zajs9isflhwg44ywlk28qfz5zci',
    'https://media-dev.weplay.space': 'bgr48ie97wgsgmqw586y2scmolu9ei',
    'https://events-dev.weplay.space': 'bgr48ie97wgsgmqw586y2scmolu9ei',
    'https://tournaments-dev.weplay.space': 'bgr48ie97wgsgmqw586y2scmolu9ei',
    'https://auto-development.weplay.space': 'bgr48ie97wgsgmqw586y2scmolu9ei',
    // CDN
    // 'https://dev.weplay.space': 'dev',
  }[origin])
  if (!twitchClientId) {
    console.warn('NO TWITCH CLIENT ID')
    return 'lyynnrkly4sorly9g1cz8659utcogx'
  }
  return twitchClientId
}

export const getSocialConfigs = origin => [
  {
    source: 'facebook',
    symbol: 'fb',
    icon: 'facebook',
    clientId: '399708430548935',
    socialName: 'Facebook',
    socialIcon: 'facebook',
    socialClass: 'fb',
  },
  {
    source: 'google',
    symbol: 'g+',
    icon: 'google',
    clientId: '697670788045-0vtams3de5122a0ebu57hmc8jcpvcccj.apps.googleusercontent.com',
    responseType: 'code',
    scope: 'email+profile',
    socialName: 'Google',
    socialIcon: 'google',
    socialClass: 'g',
  },
  {
    source: 'vk',
    symbol: 'vk',
    icon: 'vk',
    authLink: 'https://oauth.vk.com/authorize',
    queryParams: {
      redirect_uri: getRedirectUri({ origin, source: 'vk' }),
      client_id: '3706573',
      display: 'popup',
      scope: 'email',
      response_type: 'code',
      v: '5.85',
    },
    socialName: 'ВКонтакте',
    socialIcon: 'vk',
    socialClass: 'vk',
  },
  // TODO: @Andrew, hide for RELEASE/03-05-03-RV
  // {
  //   source: 'faceit',
  //   symbol: 'faceit',
  //   icon: 'faceit',
  //   authLink: 'https://cdn.faceit.com/widgets/sso/index.html',
  //   queryParams: {
  //     redirect_uri: getRedirectUri({ origin, source: 'faceit' }),
  //     response_type: 'code',
  //     client_id: 'c69f7067-b262-4cf6-a2ce-4adf186681a7',
  //     redirectPopup: true,
  //   },
  //   socialName: 'Faceit',
  //   socialIcon: 'faceit',
  //   socialClass: 'fi',
  // },
  {
    source: 'discord',
    symbol: 'discord',
    icon: 'discord',
    authLink: 'https://discordapp.com/api/oauth2/authorize',
    queryParams: {
      redirect_uri: getRedirectUri({ origin, source: 'discord' }),
      scope: 'identify email',
      response_type: 'code',
      client_id: '496590098570280960',
    },
    socialName: 'Discord',
    socialIcon: 'discord',
    socialClass: 'di',
  },
  {
    source: 'twitch',
    symbol: 'twitch',
    icon: 'twitch',
    authLink: 'https://id.twitch.tv/oauth2/authorize',
    queryParams: {
      redirect_uri: getRedirectUri({ origin, source: 'twitch' }),
      scope: 'user_read',
      response_type: 'code',
      client_id: getTwitchClientId(origin),
    },
    socialName: 'Twitch',
    socialIcon: 'twitch',
    socialClass: 'twitch',
  },
]
