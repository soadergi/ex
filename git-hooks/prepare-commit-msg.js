const fs = require('then-fs') // eslint-disable-line import/no-extraneous-dependencies
const _ = require('lodash')

const { readGitHeadParts } = require('./helpers/readGitHeadParts')
const {
  JIRA_TICKET_REGEX,
  JIRA_BASE_URL,
  COMMIT_TYPES,
} = require('./constants')
const { fetchJiraTicket } = require('./helpers/fetchJiraTicket')

const BREAKING_CHANGE_IDENTIFIER = '!!!'
async function fixCommitMessage() {
  const { branchName, jiraTicket } = await readGitHeadParts()
  const commitMessage = await fs.readFile('./.git/COMMIT_EDITMSG', 'utf8')
  if (
    branchName.includes('master')
    || branchName.includes('develop')
  ) {
    throw new Error(
      `
      ==========================================
      ==========================================
      ==========================================
      This is fucking master or develop!
      Go away!
      Commit ur code to another branch and don't forget to make PR!
      ==========================================
      ==========================================
      ==========================================
      `,
    )
  }
  let [commitType, summary] = branchName.split('/')
  let issuetypeId
  if (jiraTicket) {
    const response = await fetchJiraTicket(jiraTicket)
    const fields = response.data.fields
    issuetypeId = fields.issuetype.id
    summary = _.kebabCase(fields.summary.trimStart())
  }
  commitType = COMMIT_TYPES[issuetypeId] || commitType
  if (issuetypeId && !COMMIT_TYPES[issuetypeId]) {
    console.warn('no commit type for issuetypeId', issuetypeId)
  }

  // add support for scope
  const scope = '' // package? or product?
  if (JIRA_TICKET_REGEX.test(commitMessage)) {
    return null
  }
  const ticketURL = `${JIRA_BASE_URL}/browse/${jiraTicket}`
  const isBC = commitMessage.includes(BREAKING_CHANGE_IDENTIFIER)
  const BCMessage = isBC ? commitMessage.split(BREAKING_CHANGE_IDENTIFIER)[1] : ''
  const BCSign = isBC ? '!' : ''
  const formattedScope = scope ? `(${scope})` : ''
  const newCommitMessage = `
  ${commitType}${formattedScope}${BCSign}: [${jiraTicket}] ${summary}
  
  ${commitMessage}
  ${isBC ? `
  BREAKING CHANGE: ${BCMessage}` : ''}
  ${jiraTicket ? `closes issue ${jiraTicket} - ${ticketURL}` : ''}
  `
  return fs.writeFile('./.git/COMMIT_EDITMSG', newCommitMessage)
}

fixCommitMessage().catch((err) => {
  console.warn('Error in fixCommitMessage', err)
})
