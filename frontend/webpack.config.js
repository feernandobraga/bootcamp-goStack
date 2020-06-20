const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
  },
  devServer: {
    contentBase: path.resolve(__dirname, "public"),
  },
  module: {
    /**
     * The rules are basically: Everything you get a file that has .js on it but is not inside node_modules, please use the babel-loader
     * to transpile it.
     */
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      // rule that deals with interpreting and converting css
      {
        test: /\.css$/,
        exclude: /nome_modules/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
      // rule to handle images
      {
        test: /.*\.(gif|png|jpe?g)$/i,
        use: {
          loader: "file-loader",
        },
      },
    ],
  },
};
