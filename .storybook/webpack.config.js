const R = require('ramda')
const path = require('path');
// your app's webpack.config.js
const generalConfig = require('../webpack.config.js');

module.exports = async ({ config, mode }) => {

  config.resolve = R.mergeDeepRight(config.resolve, generalConfig.resolve)

  const generalRules = generalConfig.module.rules
  const svgRule = generalConfig.module.rules.find(rule => rule.use.some(ruleUse => ruleUse.loader === 'svg-sprite-loader'))

  const storybookImgLoader = config.module.rules.find(rule => rule.test.source.includes('svg|ico|jpg|jpeg'))

  storybookImgLoader.exclude = svgRule.include
  config.module.rules = R.concat(
    config.module.rules,
    generalRules
  )

  return config
};
