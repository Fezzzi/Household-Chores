const path = require('path')

module.exports = {
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
    alias: {
      'web': path.resolve(__dirname, '../src/web'),
      'api': path.resolve(__dirname, '../src/api'),
      'shared': path.resolve(__dirname, '../src/shared'),
      'assets': path.resolve(__dirname, '../src/assets'),
    },
  },
}
