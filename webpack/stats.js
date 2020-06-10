module.exports = {
  // ignore extract css warnings
  warningsFilter: warn => warn.indexOf('Conflicting order between:') > -1,
  entrypoints: false,
  children: false,
}
