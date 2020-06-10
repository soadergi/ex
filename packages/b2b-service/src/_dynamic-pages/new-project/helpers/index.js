export const getStats = ({ prizePool, stats }) => ({
  prizeSum: prizePool,
  ...stats.reduce((acc, stat) => ({
    ...acc,
    [stat.description]: stat.title,
  }), {}),
})

// TODO @Rohovoi remove this temporary helper and modify SocialReview later
export const getOldStyleSocialReviews = reviews => reviews
  .map(review => ({
    socialIcon: review.socialNetwork,
    title: review.socialNetwork,
    text: review.socialContent,
    nicknameUrl: review.postLink,
    nickname: review.name,
  }))

export const getLegacyPartners = partners => partners
  .map(partner => ({
    url: partner.url,
    title: partner.alt,
    logo: partner.logoUrl,
  }))
