const path = require('path');

module.exports = ({
  context: path.resolve(__dirname, '../code/client'),
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
});
