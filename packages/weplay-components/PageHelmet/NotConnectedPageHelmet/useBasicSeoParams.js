const basicSeoParams = [
  'title',
  'description',
  'keywords',
]
export const useBasicSeoParams = ({
  seoInfo,
  lokaliseProject,
  pageName,
  subPageName,
  seoParams,
  t,
}) => basicSeoParams.map((paramName) => {
  if (seoInfo?.[paramName]) {
    return seoInfo[paramName]
  }
  const projectPrefix = lokaliseProject ? `${lokaliseProject}.` : ''
  const pageStaticValue = t(`${projectPrefix}${pageName}.seo.${subPageName}.${paramName}`, seoParams)
  const globalStaticValue = t(`globalSeo.${paramName}`, seoParams)
  return pageStaticValue || globalStaticValue
})
