const path = require('path')

module.exports = {
  webpack: {
    alias: {
      components: path.resolve(__dirname, '../components/'),
      containers: path.resolve(__dirname, '../containers/'),
      utils: path.resolve(__dirname, '../utils/'),
      actions: path.resolve(__dirname, '../actions/'),
      reducers: path.resolve(__dirname, '../reducers/'),
      data: path.resolve(__dirname, '../data/'),
    },
  },
}