const { rmqManager } = require('./services/rmqManager')
const { weplayLogger } = require('./services/logger')

// TODO: think about better way to use config in each module, but probably not ENV var, I don't like this way
const sendB2BEmailFn = ({
  payload,
  mailQName,
  emails,
}) => Promise.all(
  emails.map(email => rmqManager.send({
    q: mailQName,
    type: 'NOTIFICATION',
    payload: {
      data: {
        notification_type: 'B2B_REQUEST',
        lang: 'en',
        email,
        text: `
          <br/>
          name: ${payload.name}<br/>
          email: ${payload.email}<br/>
          message: ${payload.message}<br/>
          <br/>
        `,
      },
    },
  })),
)
module.exports.sendB2BEmail = weplayLogger.withTryCatch({
  fn: sendB2BEmailFn,
  caller: 'contact-email.js',
})
