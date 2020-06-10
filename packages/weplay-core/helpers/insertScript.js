const insertScript = ({
  globalScope,
  id,
  src,
  onLoaded,
  async,
}) => {
  const alreadyInsertedScript = globalScope.document.getElementById(id)
  if (!alreadyInsertedScript) {
    const script = globalScope.document.createElement('script')
    script.id = id
    script.src = src
    script.async = async
    script.addEventListener('load', onLoaded)
    globalScope.document.body.appendChild(script)
  }
}

export default insertScript
