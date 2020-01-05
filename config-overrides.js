const { override, fixBabelImports, addLessLoader, addWebpackAlias, babelInclude } = require('customize-cra')
const path = require('path')

const resolve = function(dir) {
  return path.resolve(__dirname, 'src', dir)
}

module.exports = override(
  addWebpackAlias({
    ['@']: resolve(''),
    ['@styles']: resolve('assets/styles'),
    ['@images']: resolve('assets/images')
  }),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: false
  }),

  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {}
  })
)
