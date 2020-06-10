export const setGlobalCSSVar = ({
  globalScope,
  varName,
  varValue,
}) => {
  const root = globalScope.document.documentElement
  root.style.setProperty(`--${varName}`, varValue)
}
