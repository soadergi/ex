const path = require('path')

const ROOT_PATH = path.resolve(process.cwd())
const extensions = ['.js', '.jsx', '.json', '.scss', '.css', '.jpeg', '.jpg', '.gif', '.png', '.svg']
const alias = {
  img: path.resolve(ROOT_PATH, './src/assets/img'),
}
const modules = [
  path.resolve(ROOT_PATH, './src'),
  path.resolve(ROOT_PATH, './src/_projects'),
  'node_modules',
]

module.exports = {
  extensions,
  alias,
  modules,
  symlinks: false,
}
