module.exports = {
  presets: [
    "@babel/preset-env", // add some functionalities so the browser can understand it
    "@babel/preset-react", // add react functionalities so the browser can understand it
  ],
  plugins: ["@babel/plugin-transform-runtime"],
};
