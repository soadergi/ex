export const CHARITY_PLAY_SLUG = 'we-save-charity-play'
export const DONATION_STATS_URL = 'twitch-donation-service/stats'

export const defaultState = {
  totalAmount: 0,
  milestones: [],
  sponsorDonations: [],
}

export const formatPrizeSumWithComaAndCurrency = (prize) => {
  const prizeString = String(prize)
  return `$${prizeString.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,')}`
}

export const getNextMilestone = (donations) => {
  if (donations.milestones.length === 0) {
    return {
      amount: 0,
      title: 'TBA',
      description: 'TBA',
    }
  }

  const nextMilestone = donations.milestones.find(milestone => milestone.amount > donations.totalAmount)

  if (nextMilestone) {
    return nextMilestone
  }

  return donations.milestones.reduce((acc, milestone) => {
    if (milestone.amount > acc.amount) {
      return milestone
    }
    return acc
  })
}
