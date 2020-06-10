// const util = require('util')
// let { exec } = require('child_process')
//
// const _ = require('lodash')
//
// const { fetchJiraTicket } = require('./helpers/fetchJiraTicket')
// const { readGitHeadParts } = require('./helpers/readGitHeadParts')
// const {
//   COMMIT_TYPES,
//   DEFAULT_COMMIT_TYPE,
// } = require('./constants')
//
// exec = util.promisify(exec)
//
// // const TASK_TYPES = {
// //   10319: 'Tech Task',
// // }
//
// async function fixBranchName() {
//   const { parts } = await readGitHeadParts()
//   if (!parts.length) {
//     return
//   }
//   const jiraTicket = parts[0]
//   if (jiraTicket) {
//     let commitType = ''
//     let description = ''
//     // if (jiraTicket === 'WM-2468') {
//     //   commitType = DEFAULT_COMMIT_TYPE
//     //   description =
//     // } else {
//     const response = await fetchJiraTicket(jiraTicket)
//     const fields = response.data.fields
//     const issuetypeId = fields.issuetype.id
//     if (!COMMIT_TYPES[issuetypeId]) {
//       console.warn('no commit type for issuetypeId', issuetypeId)
//     }
//     commitType = COMMIT_TYPES[issuetypeId] || DEFAULT_COMMIT_TYPE
//     description = _.kebabCase(fields.summary.trimStart())
//     // }
//     const fixedBranchName = `${commitType}/${jiraTicket.trim()}-${description}`
//     try {
//       await exec(`git checkout -b '${fixedBranchName}'`)
//     } catch (err) {
//       const errorMessage = err.stderr
//       if (errorMessage.includes('fatal: A branch named') && errorMessage.includes('already exists.')) {
//         await exec(`git checkout -b '${fixedBranchName}'`)
//         //   all good
//         console.log('good to go')
//         return
//       }
//       throw err
//     }
//   }
// }
//
// fixBranchName().catch((err) => {
//   console.warn('Error in fixBranchName', err)
// })
