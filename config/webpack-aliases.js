const path = require('path')

module.exports = {
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
    alias: {
      'clientSrc': path.resolve(__dirname, '../src/client/src'),
      'serverSrc': path.resolve(__dirname, '../src/server/src'),
      'shared': path.resolve(__dirname, '../src/shared'),
      'assets': path.resolve(__dirname, '../src/assets'),
    },
  },
}
