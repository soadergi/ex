// TODO: @rohovoi think about better solution
export const normalizePESTournamentData = (data) => {
  if (!data) return {}
  return ({
    ...data.data[0],
    partners: Object.values(data.included?.tournamentCompany ?? {})
      .map(partner => ({
        logo: partner.attributes.logoUrl,
        partner_type: partner.type,
        title: partner.attributes.name,
        url: partner.attributes.url,
      })),
  })
}
