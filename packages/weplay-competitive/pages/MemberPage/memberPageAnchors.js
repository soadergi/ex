import {
  AT__USER_MATCHES_ANCHOR,
  AT__USER_OVERVIEW_ANCHOR,
  AT__USER_TOURNAMENTS_ANCHOR,
} from 'weplay-competitive/analytics/amplitude'

const getMemberPageAnchors = t => [
  {
    link: '#overviewSection',
    text: t('competitive.member.overview.mainTitle'),
    amplitudeEvent: AT__USER_OVERVIEW_ANCHOR,
  },
  {
    link: '#tournamentSection',
    text: t('competitive.member.tournamentSection.title'),
    amplitudeEvent: AT__USER_TOURNAMENTS_ANCHOR,
  },
  {
    link: '#matchesSection',
    text: t('competitive.member.matchesSection.title'),
    amplitudeEvent: AT__USER_MATCHES_ANCHOR,
  },
]

export default getMemberPageAnchors
