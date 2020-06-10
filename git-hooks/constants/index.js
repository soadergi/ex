module.exports.JIRA_BASE_URL = 'https://weplayspace.atlassian.net'
module.exports.JIRA_URL = `${this.JIRA_BASE_URL}/rest/api/latest/issue`
module.exports.JIRA_TICKET_REGEX = /((?<!([A-Z]{1,10})-?)[A-Z]+-\d+)/
module.exports.COMMIT_TYPES = {
  10319: 'refactor',
  10000: 'refactor',
  10002: '', // tech subtask, better use the one from branch
  5: 'feat',
  1: 'bugfix',
  3: 'feat', // https://weplayspace.atlassian.net/browse/WTM-2794
}
