const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
      path: path.join(__dirname,  'dist'),
      filename: 'bundle.js',
      library: 'MTConnect'
    },
    module: {
      rules: [
        {
          test: /.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        }
      ]
    }
  };