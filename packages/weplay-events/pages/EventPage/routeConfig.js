import Overview from './sections/Overview'
import WatchLive from './sections/WatchLive'
import Participants from './sections/Participants'
import Schedule from './sections/Schedule'
import Standings from './sections/Standings'
import GuessWinners from './sections/GuessWinners/GuessWinners'
import MVP from './sections/MVPVoting'

export default [{
  label: 'Overview',
  name: 'eventPage',
  url: '',
  disabled: false,
  component: Overview,
}, {
  label: 'WatchLive',
  name: 'watchLive',
  url: 'watch-live',
  disabled: false,
  component: WatchLive,
}, {
  label: 'Participants',
  name: 'participants',
  url: 'participants',
  disabled: false,
  component: Participants,
}, {
  label: 'Schedule',
  name: 'schedule',
  url: 'schedule',
  disabled: false,
  component: Schedule,
}, {
  label: 'Standings',
  name: 'standings',
  url: 'standings',
  disabled: false,
  component: Standings,
}, {
  label: 'Guess Winners',
  name: 'guessWinners',
  url: 'guess-winners',
  disabled: true,
  component: GuessWinners,
  isNew: true,
}, {
  label: 'MVP',
  name: 'mvpVoting',
  url: 'mvp-voting',
  disabled: true,
  component: MVP,
  isNew: false,
}]
