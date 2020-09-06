"use strict";

require("reflect-metadata");

require("dotenv/config");

var _rateLimiter = _interopRequireDefault(require("./middlewares/rateLimiter"));

var _express = _interopRequireDefault(require("express"));

require("express-async-errors");

var _routes = _interopRequireDefault(require("./routes"));

var _celebrate = require("celebrate");

var _upload = _interopRequireDefault(require("../../../config/upload"));

var _AppError = _interopRequireDefault(require("../../errors/AppError"));

require("../typeorm");

require("../../container");

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// to handle the environment variables
// the express-async-errors lib needs to be imported right after the express
// for api call data validation
// import our custom error handling class
// importing the database from the database folder
// importing the dependency injector container
// importing CORS to use the API with a front-end
const app = (0, _express.default)();
app.use(_rateLimiter.default); // to prevent API abuse

app.use((0, _cors.default)());
app.use(_express.default.json());
app.use("/files", _express.default.static(_upload.default.uploadsFolder));
app.use(_routes.default);
app.use((0, _celebrate.errors)()); // celebrate's error handling. Must be called before the main appError handler
// this NEEDS to be created RIGHT AFTER the app.use(routes)

app.use((err, request, response, next) => {
  // first we need to check if the err occurred is an instance of our custom error.
  // if this is true, this is an error that we "know" as like an error that we forecasted that could happen
  if (err instanceof _AppError.default) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message
    });
  } // we console log this so at least we can debug it


  console.error(err); // however, if the error originated from somewhere that I didn't expect, then I will return a generic message

  return response.status(500).json({
    status: "error",
    message: "Opss... I did not see this one coming"
  });
});
app.listen(3333, () => {
  console.log("👽 Server running on port 3333!");
});