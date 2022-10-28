const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
	entry: './src/index.js',
	output: {
    path: path.resolve(__dirname, './public'),
		filename: 'index.js',
	},
	module: {
		rules: [
			{
				test: /\.(css|scss)/,
				use: [
          {
					  loader: MiniCssExtractPlugin,
				  },
          {
            loader:'css-loader'
          },
          {
            loader:'sass-loader'
          }
        ]
			},
    ]
  }
}

