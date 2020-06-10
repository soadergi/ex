export const getLokaliseUrl = ({
  pathToFile,
  locale,
  isProd,
}) => (isProd
  ? `https://lokalise.weplay.tv/${pathToFile}/${locale}.json`
  : `https://lokalise.weplay.space/locales-dev/${pathToFile}/${locale}.json`)
