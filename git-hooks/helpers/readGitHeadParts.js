const fs = require('then-fs') // eslint-disable-line import/no-extraneous-dependencies

const { JIRA_TICKET_REGEX } = require('../constants')

async function readGitHeadParts() {
  const head = await fs.readFile('./.git/HEAD', 'utf8')
  const branchName = head.split('ref: refs/heads/')[1]
  const parts = JIRA_TICKET_REGEX.exec(branchName)

  return {
    branchName,
    jiraTicket: parts ? parts[0] : '',
  }
}

module.exports.readGitHeadParts = readGitHeadParts
