const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

exports.onCreateWebpackConfig = ({
  actions: {
    setWebpackConfig,
  },
}) => {
  setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.yml$/,
          include: path.resolve('translations/'),
          use: [
            { loader: 'yaml-flat-loader' },
          ],
        },
      ],
    },
    resolve: {
      plugins: [
        new TsconfigPathsPlugin(),
      ],
    },
  })
}

exports.onCreatePage = async ({
  page,
  actions: {
    createPage,
    deletePage,
    createRedirect,
  },
}) => {
  const { dir, name } = path.parse(page.path)

  // Force trailing slash for index pages
  if (name === 'index') {
    deletePage(page)
    createPage({
      ...page,
      path: path.join(dir, '/'),
    })
    createRedirect({
      fromPath: dir,
      toPath: path.join(dir, '/'),
      isPermanent: true,
      redirectInBrowser: true,
    })
    return
  }

  // Remove trailing slash for non-index pages
  createRedirect({
    fromPath: path.join(dir, name, '/'),
    toPath: path.join(dir, name),
    isPermanent: true,
    redirectInBrowser: true,
  })
}
