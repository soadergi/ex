const R = require('ramda')

// eslint-disable-next-line
const { getContactUsValidationSchema } = require('../../src/_pages/_app/ContactUsModal/ContactUsContent/ContactUsForm/getContactUsValidationSchema')
const { sendB2BEmail } = require('../contact-email')
const { weplayLogger } = require('../services/logger')

const validationSchema = getContactUsValidationSchema(R.identity)
const contactFormHandler = async (req, res, {
  mailQName,
  emails,
}) => {
  try {
    await validationSchema.validate(req.body)
    await sendB2BEmail({
      payload: req.body,
      mailQName,
      emails,
    })
    res.json({ 'message-sent': true })
  } catch (error) {
    res.status(500).send({ error })
  }
}
module.exports.contactFormHandler = weplayLogger.withTryCatch({
  fn: contactFormHandler,
  caller: 'contact-form.js',
})
