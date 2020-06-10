import { camelCase } from 'weplay-core/helpers/camelCase'

export const mapMembers = members => members.map((member) => {
  const camelizedMember = camelCase(member)
  return (
    {
      slug: member,
      nameKey: `teamPage.member.${camelizedMember}.fullName`,
      positionKey: `teamPage.member.${camelizedMember}.position`,
      descriptionKey: `teamPage.member.${camelizedMember}.description`,
      portraitPhotoKey: `teamPage.member.${camelizedMember}.portraitPhoto`,
      landscapePhotoKey: `teamPage.member.${camelizedMember}.landscapePhoto`,
    }
  )
})
