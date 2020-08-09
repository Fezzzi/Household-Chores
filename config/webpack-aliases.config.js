const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.json'],
    alias: {
      'clientSrc': path.resolve(__dirname, '../code/client/src'),
      'serverSrc': path.resolve(__dirname, '../code/server/src'),
      'shared': path.resolve(__dirname, '../code/shared'),
      '~': path.resolve(__dirname, '..'),
    },
  },
};