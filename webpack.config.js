module.exports = {
    module: {
      rules: [
        {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/', 
          },
        },
      ],
    },
  };