import SubMenuItem from './SubMenuItem/SubMenuItem'
import MobileMenuItem from './MobileMenuItem/MobileMenuItem'

const headerMenu = [
  {
    url: '/events',
    text: 'events.headerMenu.home',
    exact: true,
  },
  {
    url: '/events/dota-2/weplay-bukovel-minor-2020',
    text: 'events.headerMenu.weplay-bukovel-minor-2020',
    exact: false,
  },
  {
    url: '/events/dota-2/tug-of-war-mad-moon',
    text: 'events.headerMenu.tug-of-war-mad-moon',
    exact: false,
  },
  {
    url: '/events/dota-2/we-save-charity-play',
    text: 'events.headerMenu.we-save-charity-play',
    exact: false,
  },
  {
    url: '/events/dota-2/we-play-pushka-league',
    text: 'events.headerMenu.we-play-pushka-league',
    exact: false,
  },
  {
    SubheaderComponent: SubMenuItem,
    MobileMenuComponent: MobileMenuItem,
    url: '/events/cs-go/we-play-clutch-island',
    text: 'events.headerMenu.we-play-clutch-island',
    exact: false,
  },
]

export default headerMenu
