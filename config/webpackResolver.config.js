const path = require('path');

module.exports = ({
  context: path.resolve(__dirname, '../code/client'),
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
    alias: {
      clientSrc: path.resolve(__dirname, '../code/client/src'),
      serverSrc: path.resolve(__dirname, '../code/server/src'),
    },
  },
});
