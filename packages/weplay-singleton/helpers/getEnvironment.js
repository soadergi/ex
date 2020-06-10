export const ENV_NAMES = {
  QA: 'qa',
  DEV: 'dev',
  LOCALHOST: 'localhost',
  PROD: 'prod',
}

const environmentsMap = {
  'http://localhost:8080': ENV_NAMES.LOCALHOST,
  'http://localhost:3000': ENV_NAMES.LOCALHOST,
  'https://development.weplay.space': ENV_NAMES.DEV,
  'https://qa.weplay.space': ENV_NAMES.QA,
  'https://qa2.weplay.space': ENV_NAMES.QA,
  'https://weplay.tv': ENV_NAMES.PROD,

  // CDN
  'https://dev.weplay.space': ENV_NAMES.DEV,

  // B2B
  'https://about-development.weplay.space': ENV_NAMES.DEV,
  'https://about-qa.weplay.space': ENV_NAMES.QA,
  'https://about.weplay.tv': ENV_NAMES.PROD,
  'https://about-test.weplay.tv': ENV_NAMES.PROD,
}

export const getEnvironment = (origin) => {
  if (!origin && typeof window === 'undefined') {
    return process.env.ENV_LABEL || 'localhost'
  }
  return environmentsMap[origin] ?? ENV_NAMES.DEV
}
